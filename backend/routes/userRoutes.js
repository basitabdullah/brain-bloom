import {
  allUsers,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", allUsers);
router.get("/profile", isLoggedIn, getProfile);

export default router;
