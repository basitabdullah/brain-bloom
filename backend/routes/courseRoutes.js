import express from "express"
import { createCourse, getAllPremiumCourses,getAllCourses, updateCourse, deleteCourse, getSingleCourse } from "../controllers/courseController.js"

const router = express.Router()


router.get("/premium",getAllPremiumCourses)
router.get("/",getAllCourses)
router.get("/:id",getSingleCourse)

router.post("/",createCourse)
router.put("/:id",updateCourse)
router.delete("/:id",deleteCourse)




export default router

