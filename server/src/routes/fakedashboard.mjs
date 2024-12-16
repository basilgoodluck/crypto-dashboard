import { Router } from "express";
// import authenticate from "../middlewares/authMiddleware.mjs";
import fakeDashboardController from "../controllers/fakeDashboardController.mjs";

const router = Router()

router.get("/fake-dashboard", fakeDashboardController);


export default router

