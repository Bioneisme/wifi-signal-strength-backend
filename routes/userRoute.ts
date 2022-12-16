import {Router} from "express";
import {
    deleteUser,
    editUser,
    getCurrentUser,
    getUser, getUserLastLocation,
    getUsers, getUsersLastLocation,
    login,
    register,
    validate
} from "../controllers/userController";
import protectedRoute from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/login", login);

router.get("/getMe", protectedRoute, getCurrentUser);
router.post("/validate", validate);

router.post("/register", register);
router.delete("/deleteUser/:id", deleteUser);
router.patch("/editUser", editUser);
router.get("/getUser/:id", getUser);
router.get("/getUsers", getUsers);

router.get("/getUserLastLocation/:id", getUserLastLocation);
router.get("/getUsersLastLocation", getUsersLastLocation);

export default router;