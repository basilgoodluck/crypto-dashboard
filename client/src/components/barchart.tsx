import React, { useMemo } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, Rectangle } from 'recharts';

interface ChartData {
    timestamp: string;
    price: string; 
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
            [dataKey]: safeValue, 
            formattedValue: safeValue >= 1_000_000
              ? `${(safeValue / 1_000_000).toFixed(1)}m`
              : safeValue >= 1_000
              ? `${(safeValue / 1_000).toFixed(1)}k`
              : safeValue.toString(),
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
        <XAxis dataKey="price" className='text-gray-100 text-[10px] bg-gray-100' />
        <YAxis className='text-gray-100 text-[10px] bg-gray-100' />
        <Tooltip />
        <Legend />
        <Bar dataKey={"price"} fill={color} activeBar={<Rectangle fill={color} stroke={color} />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart
