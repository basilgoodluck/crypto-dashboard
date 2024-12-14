import path from "path";
import fs from "fs";
import { URL } from "url";

const fileURL = new URL(import.meta.url);
const __dirname = path.dirname(fileURL.pathname);
const cachedDataFolder = path.resolve(__dirname, "../data");

export const getPriceTrends = async (req, res) => {
    try {
        const cachedPriceFile = path.join(cachedDataFolder, "ethDailyPriceTrends.json");
        if (fs.existsSync(cachedPriceFile)) {
            const data = fs.readFileSync(cachedPriceFile, 'utf8');
            res.status(200).json(JSON.parse(data));
        } else {
            res.status(404).json({ message: "Price data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMarketCaps = async (req, res) => {
    try {
        const cachedMarketCapsFile = path.join(cachedDataFolder, "ethDailyMarketCaps.json");
        if (fs.existsSync(cachedMarketCapsFile)) {
            const data = fs.readFileSync(cachedMarketCapsFile, 'utf8');
            res.status(200).json(JSON.parse(data));
        } else {
            res.status(404).json({ message: "Market cap data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTotalVolumes = async (req, res) => {
    try {
        const cachedVolumeFile = path.join(cachedDataFolder, "ethDailyTotalVolumes.json");
        if (fs.existsSync(cachedVolumeFile)) {
            const data = fs.readFileSync(cachedVolumeFile, 'utf8');
            res.status(200).json(JSON.parse(data));
        } else {
            res.status(404).json({ message: "Volume data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
