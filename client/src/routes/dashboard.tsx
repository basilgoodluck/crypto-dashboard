import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/authProvider';
import axios from 'axios';
import { useNotification } from '../hooks/notificationContext';
import { fetchPriceTrends, fetchMarketCaps, fetchTotalVolumes } from '../api/data';
import Example from './example';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const priceTrends = await fetchPriceTrends();
        const marketCaps = await fetchMarketCaps();
        const totalVolumes = await fetchTotalVolumes();

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
    <section className='background-container overflow-x-hidden' id='background-container'>
      <div className='bg-background-dark flex justify-start items-center gap-12 mt-12 pt-12 flex-col lg:flex-row w-11/12 md:w-4/5 mx-auto'>
        <h1>Hello {IsAuthenticated ? username : 'Guest'}</h1>
      </div>
      <Example data={priceData} />
      <Example data={marketCapData} />
      <Example data={volumeData} />
    </section>
  );
};
