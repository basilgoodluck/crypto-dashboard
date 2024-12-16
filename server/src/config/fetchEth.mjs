import fetch from "node-fetch";

const params = new URLSearchParams({
  vs_currency: 'usd',
  days: '30', 
});

export const fetchEthData = async () => {
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

    return {
      priceTrends: data.prices.map(([timestamp, price]) => ({ timestamp, price })),
      marketCaps: data.market_caps.map(([timestamp, price]) => ({ timestamp, price })),
      totalVolumes: data.total_volumes.map(([timestamp, price]) => ({ timestamp, price })),
    };
  } catch (error) {
    console.error("Failed to fetch Ethereum data:", error.message);
    return {
      priceTrends: [],
      marketCaps: [],
      totalVolumes: [],
    };
  }
};

export const fetchEthHourlyPriceTrends = async () => {
  try {
    const data = await fetchEthData();
    return data.priceTrends;
  } catch (error) {
    console.error("Failed to fetch Ethereum price trends:", error.message);
    return [];
  }
};

export const fetchEthHourlyMarketCaps = async () => {
  try {
    const data = await fetchEthData();
    return data.marketCaps;
  } catch (error) {
    console.error("Failed to fetch Ethereum market caps:", error.message);
    return [];
  }
};

export const fetchEthHourlyTotalVolumes = async () => {
  try {
    const data = await fetchEthData();
    return data.totalVolumes;
  } catch (error) {
    console.error("Failed to fetch Ethereum volumes:", error.message);
    return [];
  }
};
