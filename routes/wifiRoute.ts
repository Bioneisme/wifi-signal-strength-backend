import {Router} from "express";
import {getUserWifi, postWifi} from "../controllers/wifiController";
import {DI} from "../index";
import {Test} from "../entities";

const router: Router = Router();

router.post("/postWifi", postWifi);

router.get("/getUserWifi/:id", getUserWifi);

router.get("/getPhones", async (req, res) => {
    const phones = await DI.em.find(Test, {}, {fields: ["name", "phone"]});
    res.send(phones);
});

export default router;