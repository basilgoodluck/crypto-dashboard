import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/authProvider';
import axios from 'axios';
import { useNotification } from '../hooks/notificationContext';
import { fetchDashboardData } from '../api/data';
import FlexibleAreaChart from '../components/areachart';
import FlexibleLineChart from '../components/linechart';
import { useParams } from 'react-router-dom';

interface EthData {
  timestamp: string;
  price: string;
}

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { IsAuthenticated, username } = useAuth();
  const { setNotification } = useNotification();
  const [priceData, setPriceData] = useState<EthData[]>([]);
  const [marketCapData, setMarketCapData] = useState<EthData[]>([]);
  const [volumeData, setVolumeData] = useState<EthData[]>([]);

  const gridTemplateArea = `
    "a b"
    "a b"
    "a b"
    "a b"
    "c d"
    "c d"
    "c d"
    "c d"
    "e f"
    "e f"
    "e f"
    "e f"
  `

  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dashboardData = await fetchDashboardData(userId!); // `!` ensures `userId` is defined
        const { priceTrends, marketCaps, totalVolumes } = dashboardData;

        setPriceData(priceTrends);
        setMarketCapData(marketCaps);
        setVolumeData(totalVolumes);
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

    if (userId && IsAuthenticated) {
      fetchData();
    }
  }, [userId, IsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <section className='background-container overflow-x-hidden bg-accent-dark' id='background-container'>
      <div className=' mt-12 pt-12  mx-auto py-4 md:w-4/5'>
        <h1 className='text-text-dark font-bold text-xl'>Hello {IsAuthenticated ? username : 'Guest'}</h1>
        <div className="grid gap-4 py-6"
          style={{
            gridTemplateColumns: "repeat(, minmax(370px, 1fr))",
            gridTemplateRows:  "repeat(10, minmax(60px, 1fr))",
            gridTemplateAreas: gridTemplateArea,

          }}
        >
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
        </div>
      </div>
    </section>
  );
};