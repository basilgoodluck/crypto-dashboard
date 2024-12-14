import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  timestamp: string;
  price: string;
}

const FlexibleAreaChart: React.FC<{
  data: ChartData[]; 
  dataKey?: 'price' | 'marketCap' | 'volume';
  color?: string;
  gridArea: string;
}> = ({ 
  data, 
  dataKey = 'price',
  color = '#8884d8', 
  gridArea
}) => {
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
    <div className="p-4 flex justify-center items-center h-[400px] w-full shadow-xl shadow-black bg-blak rounded-lg">
      <div className="w-full h-full ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
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
            <YAxis 
              label={{ 
                value: dataKey.charAt(0).toUpperCase() + dataKey.slice(1), 
                angle: -90, 
                position: 'insideLeft' 
              }} 
            />
            <Tooltip 
              formatter={(value) => [
                new Intl.NumberFormat('en-US').format(value as number), 
                dataKey.charAt(0).toUpperCase() + dataKey.slice(1)
              ]}
            />
            <Area 
              type="monotone" 
              dataKey={dataKey}
              stroke={color}
              fill={color} 
              fillOpacity={0.3} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FlexibleAreaChart;