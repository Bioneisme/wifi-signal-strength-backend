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

    @Property({type: "numeric"})
    frequency!: number;

    @Property({type: "numeric"})
    lat!: number;

    @Property({type: "numeric"})
    lng!: number;

    @Property({type: "numeric"})
    accuracy!: number;

    @Property({type: "string"})
    city!: string;

    @Property({type: "string"})
    zipcode!: string;

    @Property({type: "string"})
    streetName!: string;

    @Property({type: "string"})
    streetNumber!: string;

    @Property({type: "string"})
    countryCode!: string;


    constructor(user: Users, name: string, bssid: string, distance: number, level: number, security: string,
                frequency: number, lat: number, lng: number, accuracy: number, city: string, zipcode: string,
                streetName: string, countryCode: string, streetNumber: string) {
        super();
        this.user = user;
        this.name = name;
        this.bssid = bssid;
        this.distance = distance;
        this.level = level;
        this.security = security;
        this.frequency = frequency;
        this.lat = lat;
        this.lng = lng;
        this.accuracy = accuracy;
        this.city = city;
        this.zipcode = zipcode;
        this.streetName = streetName;
        this.countryCode = countryCode;
        this.streetNumber = streetNumber;
    }
}