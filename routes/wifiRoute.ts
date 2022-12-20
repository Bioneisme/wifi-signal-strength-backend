import {Router} from "express";
import {deleteWifi, getUserWifi, getWifi, getWifis, postWifi} from "../controllers/wifiController";
import test from "./test.json";
import {Test} from "../entities";
import {DI} from "../index";

const router: Router = Router();

router.post("/postWifi", postWifi);

router.get("/getUserWifi/:id", getUserWifi);
router.get("/getWifi/:id", getWifi);
router.get("/getWifis", getWifis);

router.delete("/deleteWifi/:id", deleteWifi);

router.get("/getPhones/:id", async (req, res) => {
    const {id} = req.params;
    const phones = await DI.em.find(Test, {
        id: {
            $gt: +id
        }
    }, {fields: ["name", "phone"]});
    res.send(phones);
});

export default router;