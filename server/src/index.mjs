import express from "express";
import cors from "cors";
import process from "process";
import cron from "node-cron"
import { configDotenv } from "dotenv";
import authRoute from "./routes/authRoute.mjs";
import dashboardRoute from "./routes/dashboardRoute.mjs";
import { fetchEthHourlyPriceTrends, fetchEthHourlyMarketCaps, fetchEthHourlyTotalVolumes } from "./config/fetchEth.mjs";
import { writeToFile } from "./utils/writeToFile.mjs";

configDotenv()

const PORT = process.env.PORT || 3333
const app = express()
app.use(express.json())
app.use(cors());
  

app.use("/api/auth", authRoute)
app.use("/api", dashboardRoute)

cron.schedule('0 */1 * * *', async () => {
    console.log('Fetching Ethereum price trends...');
    const priceTrends = await fetchEthHourlyPriceTrends();
    writeToFile("/data/ethDailyPriceTrends.json", JSON.stringify(priceTrends));
    console.log('Ethereum price trends updated.');
});

cron.schedule('0 */1 * * *', async () => {
    console.log('Fetching Ethereum market caps...');
    const market_caps = await fetchEthHourlyMarketCaps();
    writeToFile("/data/ethDailyMarketCaps.json", JSON.stringify(market_caps));
    console.log('Ethereum Market cap updated.');
});

cron.schedule('0 */1 * * *', async () => {
    console.log('Fetching Ethereum total volumes...');
    const total_volumes = await fetchEthHourlyTotalVolumes();
    writeToFile("/data/ethDailyTotalVolumes.json", JSON.stringify(total_volumes));
    console.log('Ethereum Total volumes updated.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 