import {Entity, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";

@Entity()
export class Users extends baseEntity {
    @Property({type: "string"})
    username!: string;

    @Property({type: "string"})
    email!: string;

    @Property({type: "string"})
    password!: string;

    constructor(email: string, password: string, username: string) {
        super();
        this.email = email;
        this.password = password;
        this.username = username;
    }
}