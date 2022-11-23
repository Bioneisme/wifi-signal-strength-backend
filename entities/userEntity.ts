import {Entity, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";

@Entity()
export class Users extends baseEntity {
    @Property({type: "string"})
    username!: string;

    @Property({type: "string"})
    login!: string;

    @Property({type: "string"})
    password!: string;

    constructor(login: string, password: string, username: string) {
        super();
        this.login = login;
        this.password = password;
        this.username = username;
    }
}