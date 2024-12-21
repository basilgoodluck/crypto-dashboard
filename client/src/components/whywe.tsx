import React from 'react';
import { FaLock, FaChartLine, FaUsers } from 'react-icons/fa';
import SlideBoxUp from './slideboxup';

const reasons = [
  {
    icon: <FaLock className="text-4xl" />,
    title: 'Secure Platform',
    description: 'Your data and wallet information are kept secure with state-of-the-art encryption.',
  },
  {
    icon: <FaChartLine className="text-4xl " />,
    title: 'Real-Time Tracking',
    description: 'Get up-to-date Ethereum price, market trends, and whale movements instantly.',
  },
  {
    icon: <FaUsers className="text-4xl " />,
    title: 'Community Focused',
    description: 'Join a community of Ethereum enthusiasts to stay informed and connected.',
  },
];

const WhyWe: React.FC = () => {
  return (
    <section className="py-12 bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <SlideBoxUp className=''>
                {reason.icon}
                <h3 className="text-xl font-semibold mt-4">{reason.title}</h3>
                <p className="mt-2 text-sm text-gray-300">{reason.description}</p>
              </SlideBoxUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWe;
