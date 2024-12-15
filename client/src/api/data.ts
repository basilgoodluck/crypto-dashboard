import axios from "axios";

const API = axios.create({
    baseURL: "https://crypto-dashboard-pxrw.onrender.com",
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('/api/refresh-token', { token: refreshToken });
                
                const { authToken } = response.data;
                
                localStorage.setItem('authToken', authToken);

                originalRequest.headers['Authorization'] = `Bearer ${authToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                
                window.location.href = '/sign-in';
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

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

export const fetchDashboardData = (token: string): Promise<DashboardData> => {
    return API.get(`/users/:userId/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
};

export default API;