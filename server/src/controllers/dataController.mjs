import path from "path";
import fs from "fs";
import { URL } from "url";

const fileURL = new URL(import.meta.url);
const __dirname = path.dirname(fileURL.pathname);
const cachedDataFolder = path.resolve(__dirname, "../data");


export const getPriceTrends = async (req, res) => {
    try{
        const cachedPriceFile = path.join(cachedDataFolder, "ethDailyPriceTrends.json")
        if(cachedPriceFile){
            const data = fs.readFileSync(cachedPriceFile)
            res.status(200).json(JSON.parse(data))
        }else{
            res.status(404).json({ message: "Not price data found" })
        }
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}
export const getMarketCaps = async (req, res) => {
    try{
        const cachedPriceFile = path.join(cachedDataFolder, "ethDailyMarketCaps.json")
        if(cachedPriceFile){
            const data = fs.readFileSync(cachedPriceFile)
            res.status(200).json(JSON.parse(data))
        }else{
            res.status(404).json({ message: "Not market cap data found" })
        }
    }
    catch(error){
        res.status(500).json({ message: error.message })

    }
}
export const getTotalVolumes = async (req, res) => {
    try{
        const cachedPriceFile = path.join(cachedDataFolder, "ethDailyTotalVolumes.json")
        if(cachedPriceFile){
            const data = fs.readFileSync(cachedPriceFile)
            res.status(200).json(JSON.parse(data))
        }else{
            res.status(404).json({ message: "Not volume data found" })
        }
    }
    catch(error){
        res.status(500).json({ message: error.message })

    }
}