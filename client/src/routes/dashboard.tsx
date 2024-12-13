import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/authProvider';
import axios from 'axios';
import { useNotification } from '../hooks/notificationContext';
import { fetchPriceTrends, fetchMarketCaps, fetchTotalVolumes } from '../api/data';

interface EthData {
  timestamp: string,
  price: string
}
interface DashboardData {
  priceTrends: EthData[];
  marketCaps: EthData[];
  totalVolumes: EthData[];
}

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)   
  const { IsAuthenticated, username } = useAuth(); 
  const { setNotification } = useNotification();

  console.log(IsAuthenticated)

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const priceTrends = await fetchPriceTrends();
            const marketCaps = await fetchMarketCaps();
            const totalVolumes = await fetchTotalVolumes();

            setDashboardData({ priceTrends, marketCaps, totalVolumes });
            console.log({ priceTrends, marketCaps, totalVolumes })
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response) {
              const errorMessage = error.response.data.message || "Error during sign in";
              setNotification({ 
                  message: errorMessage, 
                  type: "error" 
              });
          } else {
              setNotification({ 
                  message: "An unexpected error occurred", 
                  type: "error" 
              });
          }
        }
        finally{
          setLoading(false)
        }
    };

    fetchData();
  }, []);

  return (
    <section className='background-container overflow-x-hidden' id='background-container'>
      <div className=' bg-background-dark flex justify-start items-center gap-12 mt-12 pt-12 flex-col lg:flex-row w-11/12 md:w-4/5 mx-auto'>
        <h1>Hello {username}</h1>
      </div>
    </section>
  )
}
