import React, { useEffect, useState } from 'react';

const LivePrice: React.FC = () => {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(data.p);
    };

    return () => ws.close(); 
  }, []);

  return <div className='mt-5 text-black py-4 rounded-lg font-bold text-2xl'><span className='font-light'>
    ETH/USDT Price:</span> <br /> {price ? `$${Math.ceil((price * 10000) / 10000).toFixed(2)}` : 'Loading...'}
    <p className='text-[16px] font-normal '><span className='font-bold '>Ethereum (ETH) Live Price </span> 
     Ethereum powers decentralized apps and smart contracts. Stay updated with the live ETH price as it changes in real time!</p>
    </div>;
};

export default LivePrice;
