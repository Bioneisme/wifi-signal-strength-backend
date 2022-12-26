import {Router} from "express";
import {deleteWifi, getUserWifi, getWifi, getWifis, postWifi} from "../controllers/wifiController";
import {Test} from "../entities";
import {DI} from "../index";
import {QueryOrder} from "@mikro-orm/core";

const router: Router = Router();

router.post("/postWifi", postWifi);

router.get("/getUserWifi/:id", getUserWifi);
router.get("/getWifi/:id", getWifi);
router.get("/getWifis", getWifis);

router.delete("/deleteWifi/:id", deleteWifi);

router.get("/getPhones/:id", async (req, res) => {
    const {id} = req.params;
    const phones = await DI.em.find(Test, {}, {
        fields: ["name", "phone"], orderBy: {
            phone: QueryOrder.ASC
        }, limit: +id
    });
    res.send(phones);
});

export default router;