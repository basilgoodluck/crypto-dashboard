const fakeDashboardController = async (req, res) => {
    try {
        return res.status(200).json({ message: "I am a developer" });
    } catch (error) {
        console.error("Error in dashboardController:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default fakeDashboardController;
