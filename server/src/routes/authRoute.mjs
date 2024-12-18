import { Router } from "express";
import { refreshToken, signIn, signOut, signUp } from "../controllers/authController.mjs";

const router = Router()

router.post("/", signUp)
router.post("/", signIn)
router.post("/", signOut)
router.post("/", refreshToken)

export default router                                                     