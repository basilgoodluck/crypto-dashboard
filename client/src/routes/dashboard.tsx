import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/authProvider";
import axios from "axios";
import { useNotification } from "../hooks/notificationContext";
import { fetchFakeDashboardData } from "../api/data";
// import { fetchDashboardData, fetchFakeDashboardData } from "../api/data";
// import FlexibleAreaChart from "../components/areachart";
// import FlexibleLineChart from "../components/linechart";

// interface EthData {
//   timestamp: string;
//   price: string;
// }

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { IsAuthenticated, username } = useAuth();
  const { setNotification } = useNotification();
  // const [priceData, setPriceData] = useState<EthData[]>([]);
  // const [marketCapData, setMarketCapData] = useState<EthData[]>([]);
  // const [volumeData, setVolumeData] = useState<EthData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!IsAuthenticated) {
        setNotification({ message: "Authentication required", type: "error" });
        return;
      }

      try {
        setLoading(true);

        const dashboardData = await fetchFakeDashboardData()
        // const dashboardData = await fetchDashboardData();
        // const dashboardData = await fetchDashboardData();
        // const { priceTrends, marketCaps, totalVolumes } = dashboardData;

        // setPriceData(priceTrends.slice(0, 50) || []);
        // setMarketCapData(marketCaps.slice(0, 10) || []);
        // setVolumeData(totalVolumes.slice(0, 10) || []);
        console.log(dashboardData)
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "Error during data fetch";
          setNotification({ message: errorMessage, type: "error" });
        } else {
          setNotification({ message: "An unexpected error occurred", type: "error" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [IsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="background-container overflow-x-hidden bg-accent-dark" id="background-container">
      <div className="mt-12 pt-12 mx-auto py-4 md:w-4/5">
        <h1 className="text-text-dark font-bold text-xl">Hello {username || "Guest"}</h1>
        {/* <div className="grid gap-4 py-6">
          <FlexibleLineChart 
            data={priceData} 
            dataKey="price" 
            color="#000000" 
            gridArea="a" 
          />
          <FlexibleAreaChart 
            data={marketCapData} 
            dataKey="price" 
            color="#1e40af" 
            gridArea="b" 
          />
          <FlexibleAreaChart 
            data={volumeData} 
            dataKey="price" 
            color="#fff" 
            gridArea="c" 
          />
        </div> */}
      </div>
    </section>
  );
};
