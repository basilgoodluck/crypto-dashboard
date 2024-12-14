import { ObjectId } from "mongodb";
import { connectDB } from "../config/mongodb.mjs";
import { getPriceTrends, getMarketCaps, getTotalVolumes } from "./dataController.mjs";

const dashboardController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    if (req.user?.userId !== userId) {
      console.log("Access denied");
      return res.status(403).json({ message: "Access denied" });
    }

    const db = await connectDB();
    const users = db.collection("users");

    const objectId = ObjectId.createFromHexString(userId);
    const user = await users.findOne({ _id: objectId });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const [priceTrends, marketCaps, totalVolumes] = await Promise.all([
      getPriceTrends(),
      getMarketCaps(),
      getTotalVolumes()
    ]);

    if (priceTrends.status !== 200 || marketCaps.status !== 200 || totalVolumes.status !== 200) {
      return res.status(500).json({ message: "Failed to retrieve data" });
    }

    return res.status(200).json({
      name: user.name,
      priceTrends: priceTrends.data,
      marketCaps: marketCaps.data,
      totalVolumes: totalVolumes.data
    });

  } catch (error) {
    console.error("Error in dashboardController:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default dashboardController;
