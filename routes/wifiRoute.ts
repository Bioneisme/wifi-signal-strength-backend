import {Router} from "express";
import {getUserWifi, postWifi} from "../controllers/wifiController";

const router: Router = Router();

router.post("/postWifi", postWifi);

router.get("/getUserWifi/:id", getUserWifi);

export default router;