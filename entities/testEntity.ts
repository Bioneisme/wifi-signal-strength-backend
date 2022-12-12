import {Entity, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";

@Entity()
export class Test extends baseEntity {
    @Property({type: "string"})
    name!: string;

    @Property({type: "string"})
    phone!: string;

    constructor(name: string, phone: string) {
        super();
        this.name = name;
        this.phone = phone;
    }
}