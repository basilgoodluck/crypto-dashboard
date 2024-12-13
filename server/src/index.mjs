import express from "express";
import cors from "cors";
import process from "node:process";
import cron from "node-cron"
import { configDotenv } from "dotenv";
import { connectDB } from "./config/mongodb.mjs";
import authRoute from "./routes/authRoute.mjs";
import dataRoute from "./routes/dataRoute.mjs";
import dashboardRoute from "./routes/dashboardRoute.mjs";
import { fetchEthHourlyPriceTrends, fetchEthHourlyMarketCaps, fetchEthHourlyTotalVolumes } from "./config/fetchEth.mjs";
import { writeToFile } from "./utils/writeToFile.mjs";
import { generateRandomCode } from "./utils/generateRandomCode.mjs";

configDotenv()
const PORT = process.env.PORT || 3333
connectDB()
const app = express()
app.use(cors())
app.use(express.json())

console.log(generateRandomCode())
app.use("/api/auth", authRoute)
app.use("/api", dataRoute)
app.use("/", dashboardRoute)

const total_volumes = await fetchEthHourlyTotalVolumes();
    writeToFile("ethDailyTotalVolumes.json", JSON.stringify(total_volumes));
cron.schedule('0 */3 * * *', async () => {
    console.log('Fetching Ethereum price trends...');
    const priceTrends = await fetchEthHourlyPriceTrends();
    writeToFile("ethDailyPriceTrends.json", JSON.stringify(priceTrends));
    console.log('Ethereum price trends updated.');
});

cron.schedule('0 */3 * * *', async () => {
    console.log('Fetching Ethereum market caps...');
    const market_caps = await fetchEthHourlyMarketCaps();
    writeToFile("ethDailyMarketCap.json", JSON.stringify(market_caps));
    console.log('Ethereum Market cap updated.');
});

cron.schedule('0 */3 * * *', async () => {
    console.log('Fetching Ethereum total volumes...');
    const total_volumes = await fetchEthHourlyTotalVolumes();
    writeToFile("ethDailyTotalVolumes.json", JSON.stringify(total_volumes));
    console.log('Ethereum Total volumes updated.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 