import express from "express"
import { subscribe, verifySubscription } from "../controllers/subscribeController.js"
import { isLoggedIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/",isLoggedIn,subscribe)
router.post("/verify-subscription",isLoggedIn,verifySubscription)


export default router