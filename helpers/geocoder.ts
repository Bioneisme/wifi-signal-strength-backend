import NodeGeocoder from "node-geocoder";
import {MAPQUEST_KEY} from "../config/settings";

export async function geocoder(lat: number, lon: number) {
    const geocoder = NodeGeocoder({provider: 'mapquest', httpAdapter: 'https',
        apiKey: MAPQUEST_KEY, formatter: 'json'});

    return geocoder.reverse({lat, lon});
}