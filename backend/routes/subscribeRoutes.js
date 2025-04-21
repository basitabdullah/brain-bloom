import express from "express"
import { subscribe } from "../controllers/subscribeController.js"
import { isLoggedIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/",isLoggedIn,subscribe)


export default router