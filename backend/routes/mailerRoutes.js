import express from "express"
import { isLoggedIn } from "../middlewares/authMiddleware.js"
import { confirmMail, sendMail, sendPasswordResetMail } from "../controllers/mailerController.js"

const router = express.Router()

router.post("/",isLoggedIn,sendMail)
router.get("/confirm/:token",confirmMail)
router.post("/forgot-password",sendPasswordResetMail)




export default router