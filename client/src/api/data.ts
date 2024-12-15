import axios, { AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

const API = axios.create({
    baseURL: "https://crypto-dashboard-pxrw.onrender.com",
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    window.location.href = "/sign-in";
                    return Promise.reject(error);
                }

                const response = await API.post("/api/refresh-token", { token: refreshToken });

                const { authToken } = response.data;

                localStorage.setItem("authToken", authToken);

                if (originalRequest.headers) {
                    originalRequest.headers["Authorization"] = `Bearer ${authToken}`;
                } else {
                    originalRequest.headers = { Authorization: `Bearer ${authToken}` };
                }
                
                return axios(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");

                window.location.href = "/sign-in";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

interface EthData {
    timestamp: string;
    price: string;
}

interface DashboardData {
    name: string;
    priceTrends: EthData[];
    marketCaps: EthData[];
    totalVolumes: EthData[];
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
    const response = await API.get(`/api/dashboard`);
    return response.data;
};

export default API;
