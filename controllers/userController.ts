import Users from "../models/userModel";
import logger from "../config/logger";
import {generateJWT} from "../helpers/jwt";
import {Request, Response} from "express";
import {User, UserRequest} from "../types";
import bcryptjs from "bcryptjs";

async function register(req: Request, res: Response) {
    try {
        const {username, email, password}: Omit<User, "id"> = req.body;

        if (!username || !password || !email) {
            res.status(400).send("Missing username, email or password");
            return;
        }

        const existingUser = await Users.findOne({email});

        if (existingUser) {
            res.status(400).send("User already exists");
            return;
        }

        const slat = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, slat);

        const user = await Users.create({
            username,
            email,
            password: hashedPassword,
        });

        if (!user) {
            res.status(500).send("Cannot create user");
            return;
        }
        res.status(201).send({...(user._doc as User), token: generateJWT(user._id)});
    } catch (e) {
        logger.error(`Register: ${e}`);
    }
}

async function login(req: Request, res: Response) {
    try {
        const {email, password}: { email: string; password: string } = req.body;

        if (!email || !password) {
            res.status(400).send("Missing email or password");
            return;
        }

        const user = await Users.findOne({email});

        if (!user) {
            res.status(400).send("User does not exist");
            return;
        }

        const isPasswordValid = await bcryptjs.compare(password, user!.password);

        if (!isPasswordValid) {
            res.status(400).send("Invalid password");
            return;
        }

        res.status(201).send({...(user!._doc as User), token: generateJWT(user!._id)});
    } catch (e) {
        logger.error(`Login: ${e}`);
    }
}

async function getCurrentUser(req: Request, res: Response) {
    try {
        const user = await Users.findById((req as UserRequest).user!._id);

        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        res.status(200).send(user);
    } catch (e) {
        logger.error(`getCurrentUser: ${e}`);
    }
}

export {register, login, getCurrentUser};
