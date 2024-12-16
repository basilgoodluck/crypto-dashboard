import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPriceTrends = async () => {
    try {
        const cachedPriceFile = path.resolve(__dirname, "../data/ethDailyPriceTrends.json");
        
        if (fs.existsSync(cachedPriceFile)) {
            const data = fs.readFileSync(cachedPriceFile, "utf8");
            return JSON.parse(data);
        } else {
            console.log("Price trends file not found:", cachedPriceFile);
            return null;
        }
    } catch (error) {
        console.error("Error getting price trends:", error);
        return null;
    }
};

export const getMarketCaps = async () => {
    try {
        const cachedMarketCapsFile = path.resolve(__dirname, "../data/ethDailyMarketCaps.json");
        
        if (fs.existsSync(cachedMarketCapsFile)) {
            const data = fs.readFileSync(cachedMarketCapsFile, 'utf8');
            return JSON.parse(data);
        } else {
            console.log("Market caps file not found:", cachedMarketCapsFile);
            return null;
        }
    } catch (error) {
        console.error("Error getting market caps:", error);
        return null;
    }
};

export const getTotalVolumes = async () => {
    try {
        const cachedVolumeFile = path.resolve(__dirname, "../data/ethDailyTotalVolumes.json");
        
        if (fs.existsSync(cachedVolumeFile)) {
            const data = fs.readFileSync(cachedVolumeFile, 'utf8');
            return JSON.parse(data);
        } else {
            console.log("Total volumes file not found:", cachedVolumeFile);
            return null;
        }
    } catch (error) {
        console.error("Error getting total volumes:", error);
        return null;
    }
};