import {Router} from "express";
import {deleteWifi, getUserWifi, getWifi, getWifis, postWifi} from "../controllers/wifiController";
import test from "./test.json";

const router: Router = Router();

router.post("/postWifi", postWifi);

router.get("/getUserWifi/:id", getUserWifi);
router.get("/getWifi/:id", getWifi);
router.get("/getWifis", getWifis);

router.delete("/deleteWifi/:id", deleteWifi);

router.get("/getPhones/:id", async (req, res) => {
    const {id} = req.params;
    // @ts-ignore
    let phones = test.slice(0, id);
    // const phones = await DI.em.find(Test, {}, {fields: ["name", "phone"]});
    res.send(phones);
});

export default router;