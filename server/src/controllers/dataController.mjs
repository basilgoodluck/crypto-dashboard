import path from "path";
import fs from "fs";
import { URL } from "url";
const fileURL = new URL(import.meta.url);
const __dirname = path.dirname(fileURL.pathname);
const cachedDataFolder = path.resolve(__dirname, "../data");

export const getPriceTrends = async () => {
    try {
        const cachedPriceFile = path.join(cachedDataFolder, "ethDailyPriceTrends.json");
        if (fs.existsSync(cachedPriceFile)) {
            const data = fs.readFileSync(cachedPriceFile, 'utf8');
            return JSON.parse(data);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting price trends:", error);
        return null;
    }
};

export const getMarketCaps = async () => {
    try {
        const cachedMarketCapsFile = path.join(cachedDataFolder, "ethDailyMarketCaps.json");
        if (fs.existsSync(cachedMarketCapsFile)) {
            const data = fs.readFileSync(cachedMarketCapsFile, 'utf8');
            return JSON.parse(data);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting market caps:", error);
        return null;
    }
};

export const getTotalVolumes = async () => {
    try {
        const cachedVolumeFile = path.join(cachedDataFolder, "ethDailyTotalVolumes.json");
        if (fs.existsSync(cachedVolumeFile)) {
            const data = fs.readFileSync(cachedVolumeFile, 'utf8');
            return JSON.parse(data);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting total volumes:", error);
        return null;
    }
};