import { allUsers, login, logout, register } from "../controllers/userController.js"
import { Router } from "express"


const router = Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/allusers",allUsers)



export default router