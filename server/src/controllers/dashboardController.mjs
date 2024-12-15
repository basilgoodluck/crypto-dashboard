import { connectDB } from "../config/mongodb.mjs";
import { getPriceTrends, getMarketCaps, getTotalVolumes } from "./dataController.mjs";
import { ObjectId } from "mongodb";

const dashboardController = async (req, res) => {
    try {
        const { userId } = req.user;

        if (!userId) {
            return res.status(400).json({ message: "Invalid or missing user information" });
        }

        const db = await connectDB();
        const users = db.collection("users");

        const objectId = ObjectId.createFromHexString(userId);
        const user = await users.findOne({ _id: objectId });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const priceTrends = await getPriceTrends();
        const marketCaps = await getMarketCaps();
        const totalVolumes = await getTotalVolumes();

        if (priceTrends === null || marketCaps === null || totalVolumes === null) {
            return res.status(404).json({ message: "Some data not found" });
        }

        return res.status(200).json({
            name: user.name,
            priceTrends,
            marketCaps,
            totalVolumes
        });
    } catch (error) {
        console.error("Error in dashboardController:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

export default dashboardController;