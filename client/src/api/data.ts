import axios from "axios";
// import { useAuth } from "../hooks/authProvider"; // Import if you want to use SignOut from the hook

const API = axios.create({
    baseURL: "https://crypto-dashboard-pxrw.onrender.com",
});

// Request interceptor
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

// Response interceptor
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('/api/refresh-token', { token: refreshToken });
                
                const { authToken } = response.data;
                
                // Update the token in localStorage
                localStorage.setItem('authToken', authToken);

                // Retry the original request with the new token
                originalRequest.headers['Authorization'] = `Bearer ${authToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                // If refresh fails, log out the user
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                
                // Optionally redirect to login or trigger sign out
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

export const fetchDashboardData = (userId: string): Promise<DashboardData> => {
    return API.get(`/api/users/${userId}/dashboard`).then(response => response.data);
};

export default API;