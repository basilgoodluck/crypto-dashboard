import { Router } from "express";
import authenticate from "../middlewares/authMiddleware.mjs";
import dashboardController  from "../controllers/dashboardController.mjs";

const router = Router()

router.get("/users/:userId/dashboard", authenticate, dashboardController)

export default router

