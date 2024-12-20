import React, { useMemo } from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

// Define the type for the data
interface ChartData {
    timestamp: string;
    price: string;  // or number, depending on your actual data
  }

const Barchart: React.FC<{
    data: ChartData[]; 
    dataKey?: 'price' | 'marketCap' | 'volume';
    color?: string;
    gridArea: string;
  }> = ({ 
    data, 
    dataKey = 'price',
    color = '#8884d8', 
    gridArea
  }) =>  {
    const transformedData = useMemo(() => {
        if (!data || data.length === 0) {
        console.warn('No data provided');
        return [];
        }
    
        return data.map((item, index) => {
        try {
            const numericValue = parseFloat(item.price);
            
            if (isNaN(numericValue)) {
            console.warn(`Invalid data at index ${index}:`, item);
            return null;
            }
    
            const safeValue = Math.max(0, numericValue);
    
            return {
            timestamp: item.timestamp,
            [dataKey]: safeValue
            };
        } catch (error) {
            console.error(`Error processing data at index ${index}:`, error);
            return null;
        }
        }).filter(Boolean); 
    }, [data, dataKey]);
    
    if (transformedData.length === 0) {
        return (
        <div className="p-4 text-red-500" style={{gridArea: gridArea}}>
            No valid data to display
        </div>
        );
    }
  return (
    <div className="p-4 flex justify-center items-center min:h-[100px] w-full shadow-xl shadow-black bg-blak rounded-lg" style={{gridArea: gridArea}}>
      <div className="w-full h-full ">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
            <Bar dataKey="timestamp" fill={color} />
        </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Barchart
