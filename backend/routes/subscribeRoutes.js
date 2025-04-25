import express from "express"
import { cancelSubscription, createSubscription, verifySubscription } from "../controllers/subscribeController.js"
import { isLoggedIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/",isLoggedIn,createSubscription)
router.post("/verify-subscription",isLoggedIn,verifySubscription)
router.put("/cancel-subscription",isLoggedIn,cancelSubscription)


export default router