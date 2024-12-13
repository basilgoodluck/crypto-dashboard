import { Router } from "express";
import { getMarketCaps, getPriceTrends, getTotalVolumes } from "../controllers/dataController.mjs";

const router = Router()

router.get("/eth-market-caps", getMarketCaps)
router.get("/eth-price-trends", getPriceTrends)
router.get("/eth-total-volumes", getTotalVolumes)

export default router