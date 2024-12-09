import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/authController.mjs";

const router = Router()

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.post("/sign-out", signOut)

export default router                                                     