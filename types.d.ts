import mongoose from "mongoose";
import {Request} from "express";

export interface Todo {
    text: string;
    user: mongoose.Schema.Types.ObjectId;
}

export interface User extends mongoose.Document {
    id: string;
    username: string;
    email: string;
    password: string;
    _doc?: User;
}

export type UserRequest = Request & { user: User | null };

export interface Session {
    id: number;
    dateCreated: number;
    username: string;
    /**
     * Timestamp indicating when the session was created, in Unix milliseconds.
     */
    issued: number;
    /**
     * Timestamp indicating when the session should expire, in Unix milliseconds.
     */
    expires: number;
}

/**
 * Identical to the Session type, but without the `issued` and `expires` properties.
 */
export type PartialSession = Omit<Session, "issued" | "expires">;

export interface EncodeResult {
    token: string;
    expires: number;
    issued: number;
}