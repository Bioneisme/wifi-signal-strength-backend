import {verifyJWT} from "../helpers/jwt";
import User from "../models/userModel";
import logger from "../config/logger";
import {Response, Request, NextFunction} from "express";
import {UserRequest} from "../types";


export default async function protectedRoute(req: Request, res: Response, next: NextFunction) {
    let token;

    if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = verifyJWT(token);

            (req as UserRequest).user = await User.findById((decoded as { id: string }).id);

            next();
        } catch (e) {
            res.status(400).send("Invalid token");
            logger.error(`Invalid Token: ${e}`);
        }
    }

    if (!token) {
        res.status(401).send("Authorization token not found");
    }
}
