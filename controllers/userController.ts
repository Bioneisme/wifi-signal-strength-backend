import logger from "../config/logger";
import {DI} from "../index";
import {generateJWT, verifyJWT} from "../helpers/jwt";
import {Request, Response} from "express";
import {UserRequest} from "../types";
import bcryptjs from "bcryptjs";
import {Users, Wifi} from "../entities";
import {QueryOrder, wrap} from "@mikro-orm/core";

async function register(req: Request, res: Response) {
    try {
        const {username, login, password} = req.body;

        if (!username || !password || !login) {
            res.status(400).send("Missing username, email or password");
            return;
        }

        const existingUser = await DI.em.findOne(Users, {login});

        if (existingUser) {
            res.status(400).send("User already exists");
            return;
        }

        const slat = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, slat);

        const user = DI.em.create(Users, {
            username,
            login,
            password: hashedPassword
        });

        await DI.em.persistAndFlush(user);

        if (!user) {
            res.status(500).send("Cannot create user");
            return;
        }

        res.status(201).send({...user, token: generateJWT(user.id)});
    } catch (e) {
        logger.error(`Register: ${e}`);
    }
}

async function login(req: Request, res: Response) {
    try {
        const {login, password} = req.body;

        if (!login || !password) {
            res.status(400).send("Missing login or password");
            return;
        }

        const user = await DI.em.findOne(Users, {login});

        if (!user) {
            res.status(400).send("User does not exist");
            return;
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).send("Invalid password");
            return;
        }

        res.status(200).send({...(user), token: generateJWT(user.id)});
    } catch (e) {
        logger.error(`Login: ${e}`);
    }
}

async function getCurrentUser(req: Request, res: Response) {
    try {
        const id = (req as UserRequest).user?.id;
        const user = await DI.em.findOne(Users, {id});

        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        res.status(200).send(user);
    } catch (e) {
        logger.error(`getCurrentUser: ${e}`);
    }
}

async function validate(req: Request, res: Response) {
    try {
        const {token} = req.body;
        const decoded = verifyJWT(token);

        const id: number = (decoded as { id: number }).id;

        const user = await DI.em.findOne(Users, {id});
        if (!user) return res.status(400).send("User not found");
        (req as UserRequest).user = user;

        return res.status(200).json({...(user), token: generateJWT(user.id)});
    } catch (e) {
        logger.error(`getCurrentUser: ${e}`);
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const user = await DI.em.findOne(Users, {id: +id});
        if (!user) return res.status(400).send("User not found");
        const wifi = await DI.em.find(Wifi, {user})
        await DI.em.removeAndFlush(wifi);

        await DI.em.removeAndFlush(user);

        return res.status(200).json('OK');
    } catch (e) {
        logger.error(`deleteUser: ${e}`);
    }
}

async function editUser(req: Request, res: Response) {
    try {
        const {id, username, login, password} = req.body;
        if (!id || !username || !login || !password) {
            res.status(400).send("Missing some fields");
            return;
        }

        const user = await DI.em.findOne(Users, {id});
        if (!user) return res.status(400).send("User not found");
        const slat = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, slat);

        wrap(user).assign({
            username,
            login,
            password: hashedPassword
        });

        await DI.em.persistAndFlush(user);

        return res.status(200).json({user});
    } catch (e) {
        logger.error(`editUser: ${e}`);
    }
}

async function getUser(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const user = await DI.em.findOne(Users, {id: +id});
        if (!user) return res.status(400).send("User not found");

        return res.status(200).json({user});
    } catch (e) {
        logger.error(`getUser: ${e}`);
    }
}

async function getUsers(req: Request, res: Response) {
    try {
        const users = await DI.em.find(Users, {});
        if (!users) return res.status(400).send("Users not found");

        return res.status(200).json({users});
    } catch (e) {
        logger.error(`getUsers: ${e}`);
    }
}

async function getUserLastLocation(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const user = await DI.em.findOne(Users, {id: +id});
        if (!user) return res.status(400).send("User not found");
        const lastScannedWifi = await DI.em.findOne(Wifi, {user}, {orderBy: {created_at: QueryOrder.DESC}});
        if (!lastScannedWifi) return res.send({lat: 0, lng: 0, accuracy: 0});

        return res.send({lat: lastScannedWifi.lat, lng: lastScannedWifi.lng, accuracy: lastScannedWifi.accuracy});
    } catch (e) {
        logger.error(`getUserLastLocation: ${e}`);
    }
}

async function getUsersLastLocation(req: Request, res: Response) {
    try {
        const users = await DI.em.find(Users, {});
        if (!users) return res.status(400).send("Users not found");
        let coords = [];
        for (const user of users) {
            const lastScannedWifi = await DI.em.findOne(Wifi, {user}, {orderBy: {created_at: QueryOrder.DESC}});
            if (!lastScannedWifi) {
                coords.push({id: user.id, lat: 0, lng: 0, accuracy: 0});
            } else {
                coords.push({id: user.id, lat: lastScannedWifi.lat, lng: lastScannedWifi.lng, accuracy: lastScannedWifi.accuracy});
            }
        }

        return res.send(coords);
    } catch (e) {
        logger.error(`getUsersLastLocation: ${e}`);
    }
}

export {register, login, getCurrentUser, validate, deleteUser, editUser, getUser, getUsers, getUserLastLocation, getUsersLastLocation};
