import axios from "axios";

const API = axios.create({
    baseURL: "https://crypto-dashboard-pxrw.onrender.com",
});

interface EthData {
    timestamp: string,
    price: string
}
interface DashboardData {
    name: string;
    priceTrends: EthData[];
    marketCaps: EthData[];
    totalVolumes: EthData[];
}

export const fetchDashboardData = (userId: string | undefined): Promise<DashboardData> => 
    API.get(`/api/users/${userId}/dashboard`).then(response => response.data);
