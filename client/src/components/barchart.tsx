import React, { useMemo } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, Rectangle } from 'recharts';

// Define the type for the data
interface ChartData {
    timestamp: string;
    price: string;  // or number, depending on your actual data
  }

const Barchart: React.FC<{
    data: ChartData[]; 
    dataKey?: 'price' | 'marketCap' | 'volume';
    color?: string;
  }> = ({ 
    data, 
    dataKey = 'price',
    color, 
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
        <div className="p-4 text-red-500">
            No valid data to display
        </div>
        );
    }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Bar dataKey="timestamp" fill={color} />
        <XAxis dataKey="price" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={"price"} fill={color} activeBar={<Rectangle fill={color} stroke={color} />} />
        {/* <Bar dataKey="uv" fill={color} activeBar={<Rectangle fill={color} stroke={color} />} /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart
