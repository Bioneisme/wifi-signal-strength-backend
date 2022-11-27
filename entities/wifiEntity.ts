import {Entity, ManyToOne, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";
import {Users} from "./userEntity";

@Entity()
export class Wifi extends baseEntity {
    @ManyToOne({type: Users})
    user!: Users;

    @Property({type: "string"})
    name!: string;

    @Property({type: "string"})
    bssid!: string;

    @Property({type: "numeric"})
    distance!: number;

    @Property({type: "numeric"})
    level!: number;

    @Property({type: "string"})
    security!: string;

    constructor(user: Users, name: string, bssid: string, distance: number, level: number, security: string) {
        super();
        this.user = user;
        this.name = name;
        this.bssid = bssid;
        this.distance = distance;
        this.level = level;
        this.security = security;
    }
}