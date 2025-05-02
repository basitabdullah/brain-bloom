import {
  allUsers,
  getProfile,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/userController.js";
import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
import { generateMailToken } from "../controllers/mailerController.js";

const router = Router();

router.post("/register", register);
router.post("/verify-email", generateMailToken);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers",isLoggedIn,isAdmin, allUsers);
router.put("/:id",isLoggedIn, updateUser);
router.get("/profile", isLoggedIn, getProfile);

export default router;
