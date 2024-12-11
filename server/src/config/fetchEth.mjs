import fetch from "node-fetch";
// import process from 'node:process';

// const ETHER_TOKEN = process.env.ETHER_TOKEN;
// const COIN_GECKO_API_KEY = process.env.COIN_GECKO_API_KEY;

const params = new URLSearchParams({
  vs_currency: 'usd',
  days: '30', 
});
export const fetchEthHourlyPriceTrends = async () => {
  try {

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?${params.toString()}`,
      {
        method: "GET",
        headers: { accept: 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.prices.map(([timestamp, price]) => ({timestamp, price}))
  } catch (error) {
    console.error("Failed to fetch Ethereum data:", error.message);
    return []
  }
};
export const fetchEthHourlyMarketCaps = async () => {
  try {

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?${params.toString()}`,
      {
        method: "GET",
        headers: { accept: 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.market_caps.map(([timestamp, price]) => ({timestamp, price}))
  } catch (error) {
    console.error("Failed to fetch Ethereum market caps:", error.message);
    return []
  }
};
export const fetchEthHourlyTotalVolumes = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?${params.toString()}`,
      {
        method: "GET",
        headers: { accept: 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.total_volumes.map(([timestamp, price]) => ({timestamp, price}))
  } catch (error) {
    console.error("Failed to fetch Ethereum volumes:", error.message);
    return []
  }
};
