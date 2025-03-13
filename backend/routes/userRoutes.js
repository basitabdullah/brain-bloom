import { register } from "../controllers/userController.js"
import { Router } from "express"


const router = Router()

router.get("/register",register)



export default router