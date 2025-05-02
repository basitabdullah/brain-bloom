import express from "express"
import { isLoggedIn } from "../middlewares/authMiddleware.js"
import { confirmMail, sendMail } from "../controllers/mailerController.js"

const router = express.Router()

router.post("/",isLoggedIn,sendMail)
router.get("/confirm/:token",confirmMail)




export default router