import React from 'react';
import { FaUserCheck, FaWallet, FaChartLine } from 'react-icons/fa';
import SlideBoxUp from './slideboxup';

const steps = [
  {
    icon: <FaUserCheck className="text-4xl text-accent-dark" />,
    title: 'Sign Up',
    description: 'Create an account in seconds to get started with your Ethereum journey.',
  },
  {
    icon: <FaWallet className="text-4xl text-accent-dark" />,
    title: 'Connect Wallet',
    description: 'Securely connect your Ethereum wallet to track your holdings.',
  },
  {
    icon: <FaChartLine className="text-4xl text-accent-dark" />,
    title: 'Monitor Performance',
    description: 'Access real-time data, charts, and alerts to stay informed.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 bg-white text-text">
      <div className="container w-11/12 md:w-4/5 mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <SlideBoxUp className=''>
                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                    {step.icon}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-accent-dark">{step.description}</p>
              </SlideBoxUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
