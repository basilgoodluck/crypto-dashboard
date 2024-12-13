import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = axios.create({
    baseURL: "https://crypto-dashboard-pxrw.onrender.com",
});

API.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("authToken");
    if (token && validateToken(token)) {
        config.headers.Authorization = `Bearer ${token}`;
    } else if (token) {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await axios.post("/api/refresh-token", { token: refreshToken });
            const { authToken } = response.data;
            localStorage.setItem("authToken", authToken);
            config.headers.Authorization = `Bearer ${authToken}`;
        } catch (error) {
            console.error("Token refresh failed:", error);
            localStorage.clear(); 
            window.location.href = "/sign-in"; 
        }
    }
    return config;
});

const validateToken = (token: string): boolean => {
    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

export default API;
