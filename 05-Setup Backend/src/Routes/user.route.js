import { Router } from "express";
import { registerUser } from "../Controllers/user.controller.js";

const router = Router()

router.route('/register').put(registerUser)


export default router

