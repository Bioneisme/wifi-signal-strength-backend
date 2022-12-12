import {Router} from "express";
import {getUserWifi, postWifi} from "../controllers/wifiController";
import axios from "axios";
import {DI} from "../index";
import {Test} from "../entities";

const router: Router = Router();

router.post("/postWifi", postWifi);

router.get("/getUserWifi/:id", getUserWifi);

router.get("/getPhones", async (req, res) => {
    const phones = await DI.em.find(Test, {}, {fields: ["name", "phone"]});
    res.send(phones);
});

router.get("/load", async (req, res) => {
    try {
        const data = await axios.get("https://x-api.statsnet.co/v1/peps", {headers: {bypass: "mKg4qydcmUJ5DAm9",
                "Accept-Encoding": "gzip,deflate,compress"}});
        data.data.forEach((item: {name: string, phone: string}) => {
            const test = DI.em.create(Test, {name: item.name, phone: item.phone});
            DI.em.persistAndFlush(test);
        })
        res.send('ok')
    } catch (e) {
        res.send('error')
        console.log(e)
    }
})

export default router;