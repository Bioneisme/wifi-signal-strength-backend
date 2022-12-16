import {Router} from "express";
import {deleteWifi, getUserWifi, getWifi, getWifis, postWifi} from "../controllers/wifiController";
import {DI} from "../index";
import {Test} from "../entities";

const router: Router = Router();

router.post("/postWifi", postWifi);

router.get("/getUserWifi/:id", getUserWifi);
router.get("/getWifi/:id", getWifi);
router.get("/getWifis", getWifis);

router.delete("/deleteWifi/:id", deleteWifi);

router.get("/getPhones", async (req, res) => {
    const phones = await DI.em.find(Test, {}, {fields: ["name", "phone"]});
    res.send(phones);
});

export default router;