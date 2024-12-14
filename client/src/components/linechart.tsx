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

// Use your existing EthData interface directly
interface ChartData {
  timestamp: string;
  price: string;  // or number, depending on your actual data
}

const FlexibleLineChart: React.FC<{
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
    <div className={`p-4 flex justify-center items-center h-[400px] w-full shadow-xl shadow-black bg-blak rounded-lg`} style={{gridArea}}>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
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
              dataKey="timestamp"
              tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke={color} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FlexibleLineChart;