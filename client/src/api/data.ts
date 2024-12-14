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

export const fetchDashboardData = (userId: string, token: string): Promise<DashboardData> => {
    return API.get(`/api/users/${userId}/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
};
