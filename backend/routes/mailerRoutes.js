import express from "express"
import { isLoggedIn } from "../middlewares/authMiddleware.js"
import { sendMail } from "../controllers/mailerController.js"

const router = express.Router()

router.post("/",isLoggedIn,sendMail)



export default router