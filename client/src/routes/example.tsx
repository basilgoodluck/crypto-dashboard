import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Data {
  timestamp: string;
  price: string;
}

interface ExampleProps {
  data: Data[];
}

const Example: React.FC<ExampleProps> = ({ data }) => {
  return (
    <div className="p-4 flex justify-center items-center h-full">
      <div className="w-full h-full md:w-1/3 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Example;
