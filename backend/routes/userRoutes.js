import {
  allUsers,
  login,
  logout,
  register,
  subscribe,
} from "../controllers/userController.js";
import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", allUsers);
router.get("/profile", isLoggedIn, allUsers);
router.get("/subscribe", isLoggedIn, subscribe);

export default router;
