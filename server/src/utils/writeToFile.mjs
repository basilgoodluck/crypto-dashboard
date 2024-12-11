import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, "../data");

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

export const writeToFile = function (filename, data, format = false) {
    const filePath = path.join(dataDir, filename);

    if (!data) {
        throw new Error("Data to write is undefined or null");
    }

    const formattedData = format && typeof data === "object" 
    ? JSON.stringify(data, null, 2) 
    : data;

    fs.writeFileSync(filePath, formattedData, "utf-8");
};
