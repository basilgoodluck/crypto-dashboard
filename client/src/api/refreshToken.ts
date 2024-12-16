import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = axios.create({
    baseURL: "https://crypto-dashboard-pxrw.onrender.com",
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
    } catch {
        console.error("Token refresh failed");
        localStorage.clear();
        window.location.href = "/sign-in";
        throw new Error("Token refresh failed");
    }
};

// Fetch data from the API
export const fetchDashboardData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || !validateToken(token)) {
        throw new Error("No valid auth token found");
    }

    try {
        const response = await axios.get(`/api/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            const newToken = await refreshToken();
            const retryResponse = await axios.get(`/api/dashboard`, {
                headers: { Authorization: `Bearer ${newToken}` },
            });
            return retryResponse.data;
        }
        throw error;
    }
};

export const fetchFakeDashboardData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || !validateToken(token)) {
        throw new Error("No valid auth token found");
    }

    try {
        const response = await axios.get(`/api/fake-dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            const newToken = await refreshToken();
            const retryResponse = await axios.get(`/api/fake-dashboard`, {
                headers: { Authorization: `Bearer ${newToken}` },
            });
            return retryResponse.data;
        }
        throw error;
    }
};

export default API;
