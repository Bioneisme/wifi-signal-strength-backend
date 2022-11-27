import {Router} from "express";
import {postWifi} from "../controllers/wifiController";

const router: Router = Router();

router.post("/postWifi", postWifi);

export default router;