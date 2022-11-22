import {Router} from "express";
import {getCurrentUser, login, register} from "../controllers/userController";
import protectedRoute from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/getMe", protectedRoute, getCurrentUser);

export default router;