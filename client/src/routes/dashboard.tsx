import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/authProvider";
import axios from "axios";
import { useNotification } from "../hooks/notificationContext";
import { fetchDashboardData } from "../api/data";
import FlexibleAreaChart from "../components/areachart";
import FlexibleLineChart from "../components/linechart";
import useMediaQuery from "../hooks/useMediaQuery";
import Barchart from "../components/barchart";
import Whaleslist from "../components/whaleslist";

interface EthData {
  timestamp: string;
  price: string;
}

const gridAreaLarge = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`

const gridAreaSmall = `
  a
  b
  c
  d
  e
  f
  g
  h
  i
`

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { IsAuthenticated } = useAuth();
  const { setNotification } = useNotification();
  const [priceData, setPriceData] = useState<EthData[]>([]);
  const [marketCapData, setMarketCapData] = useState<EthData[]>([]);
  const [volumeData, setVolumeData] = useState<EthData[]>([]);

  const aboveMedia = useMediaQuery("(min-width: 1060px)")

  useEffect(() => {
    const fetchData = async () => {
      if (!IsAuthenticated) {
        setNotification({ message: "Authentication required", type: "error" });
        return;
      }

      try {
        setLoading(true);
        
        const dashboardData = await fetchDashboardData();
        const { priceTrends, marketCaps, totalVolumes } = dashboardData;

        setPriceData(priceTrends.slice(0, 10) || []);
        setMarketCapData(marketCaps.slice(0, 50) || []);
        setVolumeData(totalVolumes.slice(0, 50) || []);
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
        <h1 className="text-text-dark text-2xl">Helo {"Guest"}</h1>
        <div className="grid gap-4 py-6" style={{gridTemplateAreas: aboveMedia ? gridAreaLarge : gridAreaSmall, gridTemplateColumns: "repeat(3, minmax(370px, 1fr)) ", gridTemplateRows: "repeat(10, minmax(60px, 1fr))"}}>
          <FlexibleAreaChart 
            data={marketCapData} 
            dataKey="price" 
            color="#1e40af" 
            gridArea="a" 
          />
          <FlexibleAreaChart 
            data={volumeData} 
            dataKey="price" 
            color="#fff" 
            gridArea="b" 
          />
          <Barchart 
            data={priceData} 
            dataKey="price" 
            color="#ff4" 
            gridArea="c"
          />
          <FlexibleAreaChart 
            data={marketCapData} 
            dataKey="price" 
            color="#1e40af" 
            gridArea="d" 
          />
          <FlexibleAreaChart 
            data={volumeData} 
            dataKey="price" 
            color="#fff" 
            gridArea="e" 
          />
          <FlexibleLineChart 
            data={priceData} 
            dataKey="price" 
            color="#000000" 
            gridArea="f" 
          />
          <FlexibleAreaChart 
            data={marketCapData} 
            dataKey="price" 
            color="#1e40af" 
            gridArea="g" 
          />
          <Whaleslist 
            gridArea="h"
          />
          {/* <FlexibleAreaChart 
            data={volumeData} 
            dataKey="price" 
            color="#fff" 
            gridArea="h" 
          /> */}
          <FlexibleLineChart 
            data={priceData} 
            dataKey="price" 
            color="#000000" 
            gridArea="i" 
          />
          <FlexibleLineChart 
            data={priceData} 
            dataKey="price" 
            color="#000000" 
            gridArea="j" 
          />
        </div>
      </div>
    </section>
  );
};
