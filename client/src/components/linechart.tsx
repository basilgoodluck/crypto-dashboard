import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  timestamp: string;
  price: string;  
}

const FlexibleLineChart: React.FC<{
  data: ChartData[]; 
  dataKey?: 'price' | 'marketCap' | 'volume';
  color?: string;
}> = ({ 
  data, 
  dataKey = 'price',
  color = '#8884d8', 
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
    <ResponsiveContainer >
      <LineChart
        data={transformedData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          className='text-gray-100 text-[10px] bg-gray-100'
          dataKey="timestamp"
          tickFormatter={(tick) => new Date(tick).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
        />
        <YAxis className='text-gray-100 text-[10px] bg-gray-100' />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke={color} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FlexibleLineChart;