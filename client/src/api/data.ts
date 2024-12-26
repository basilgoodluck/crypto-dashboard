import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});
const validateToken = (token: string): boolean => {
    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

const refreshToken = async (): Promise<string> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        window.location.href = "/sign-in";
        throw new Error("Refresh token not found");
    }

    try {
        const response = await API.post<{ authToken: string }>("/api/refresh-token", { token: refreshToken });
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

export const fetchDashboardData = async () => {
    const token = await validateAndRefreshToken();
    const response = await API.get(`/api/dashboard`, {
        headers: { authorization: `Bearer ${token}` },
    });
    return response.data;
};

const validateAndRefreshToken = async () => {
    const token = localStorage.getItem("authToken");
    if (token && validateToken(token)) {
        return token;
    } else if (token) {
        return await refreshToken();
    }
    throw new Error("No valid auth token found");
};

export default API;
