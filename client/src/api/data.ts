import axios from "axios";

const API = axios.create({
    baseURL: "https://crypto-dashboard-pxrw.onrender.com",
});

interface EthData {
    timestamp: string,
    price: string
}

export const fetchPriceTrends = (): Promise<EthData[]> => 
    API.get("/api/eth-price-trends").then(response => response.data);

export const fetchMarketCaps = (): Promise<EthData[]> => 
    API.get("/ap/eth-market-caps").then(response => response.data);

export const fetchTotalVolumes = (): Promise<EthData[]> => 
    API.get("/api/eth-total-volumes").then(response => response.data);
