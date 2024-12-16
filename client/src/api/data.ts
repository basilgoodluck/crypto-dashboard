import axios, { AxiosRequestConfig } from "axios";

// Extend AxiosRequestConfig to include a custom `_retry` property
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

// Dynamically use a base URL only for production (Vite proxy handles development)
const API = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : undefined,
});

// Add a request interceptor to attach the Authorization token
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

// Add a response interceptor to handle token refresh on 401 errors
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

                // Request a new auth token using the refresh token
                const response = await API.post("/api/refresh-token", { token: refreshToken });

                const { authToken } = response.data;

                // Store the new token in localStorage
                localStorage.setItem("authToken", authToken);

                // Update the original request's Authorization header
                if (originalRequest.headers) {
                    originalRequest.headers["Authorization"] = `Bearer ${authToken}`;
                } else {
                    originalRequest.headers = { Authorization: `Bearer ${authToken}` };
                }

                // Retry the original request with the new token
                return axios(originalRequest);
            } catch (refreshError) {
                // Clear tokens and redirect to the sign-in page on failure
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");

                window.location.href = "/sign-in";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Fetch dashboard data from the API
export const fetchDashboardData = async () => {
    const response = await API.get(`/api/dashboard`);
    return response.data;
};

export default API;
