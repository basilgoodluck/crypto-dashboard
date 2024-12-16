import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Dynamically use a base URL only for production (Vite proxy handles development)
const API = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : undefined,
});

// Function to validate the token
const validateToken = (token: string): boolean => {
    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

// Function to refresh the token if expired
const refreshToken = async (): Promise<string> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        window.location.href = "/sign-in";
        throw new Error("Refresh token not found");
    }

    try {
        const response = await axios.post<{ authToken: string }>("/api/refresh-token", { token: refreshToken });
        const { authToken } = response.data;
        localStorage.setItem("authToken", authToken);
        return authToken;
    } catch (error) {
        console.error("Token refresh failed:", error);
        localStorage.clear();
        window.location.href = "/sign-in";
        throw error;
    }
};

// Fetch dashboard data from the API
export const fetchDashboardData = async () => {
    const token = await validateAndRefreshToken();
    const response = await axios.get(`/api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const fetchFakeDashboardData = async () => {
    const token = await validateAndRefreshToken();
    const response = await axios.get(`/api/fake-dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const validateAndRefreshToken = async (): Promise<string> => {
    const token = localStorage.getItem("authToken");
    if (token && validateToken(token)) {
        return token;
    } else if (token) {
        return await refreshToken();
    }
    throw new Error("No valid auth token found");
};

export default API;
