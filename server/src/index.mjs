import express from "express";
import cors from "cors";
import process from "node:process"
import { configDotenv } from "dotenv";
import { connectDB } from "./config/mongodb.mjs";
import authRoute from "./routes/authRoute.mjs"
import dashboardRoute from "./routes/dashboardRoute.mjs";
import { fetchEth } from "./controllers/fetcHEth.mjs";

configDotenv()
const PORT = process.env.PORT || 3333
connectDB()
fetchEth()
const app = express()
app.use(cors())
app.use(express.json())


app.use("/auth", authRoute)
app.use("/", dashboardRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 