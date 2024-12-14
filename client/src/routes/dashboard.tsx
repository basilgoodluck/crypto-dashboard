import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/authProvider';
import axios from 'axios';
import { useNotification } from '../hooks/notificationContext';
import { fetchPriceTrends, fetchMarketCaps, fetchTotalVolumes } from '../api/data';
import FlexibleAreaChart from '../components/areachart';
import FlexibleLineChart from '../components/linechart';

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

  console.log(priceData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const priceTrends = (await fetchPriceTrends()).slice(0, 10);
        const marketCaps = (await fetchMarketCaps()).slice(0, 10);
        const totalVolumes = (await fetchTotalVolumes()).slice(0, 10);

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

    fetchData();
  }, []);
  

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
            data={marketCapData} 
            dataKey="price" 
            color="#000000" 
            gridArea="a"
          />
          {/* <FlexibleAreaChart 
            data={volumeData} 
            dataKey="price" 
            color="#1e40af" 
            gridArea="b"
          /> */}
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