import express from "express";
import {
  createCourse,
  getAllPremiumCourses,
  getAllCourses,
  updateCourse,
  deleteCourse,
  getSingleCourse,
} from "../controllers/courseController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/premium", isLoggedIn, isAdmin, getAllPremiumCourses);
router.get("/", getAllCourses);
router.get("/:id", getSingleCourse);

router.post("/", isLoggedIn, isAdmin, createCourse);
router.put("/:id", isLoggedIn, isAdmin, updateCourse);
router.delete("/:id", isLoggedIn, isAdmin, deleteCourse);

export default router;
