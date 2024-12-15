import { Router } from "express";
// import authenticate from "../middlewares/authMiddleware.mjs";
import dashboardController  from "../controllers/dashboardController.mjs";

const router = Router()

router.get("/dashboard", (req, res, next) => {
    console.log("Request received at:", new Date());
    console.log("Request params:", req.params);
    console.log("Authorization header:", req.headers.authorization);
    next();
}, dashboardController);


export default router

