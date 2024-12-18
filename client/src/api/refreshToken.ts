import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const validateToken = (token: string): boolean => {
    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

export const refreshToken = async (): Promise<string> => {

    try {
        const currentRefreshToken = localStorage.getItem("refreshToken");
        if (!currentRefreshToken) {
            window.location.href = "/sign-in";
            throw new Error("Refresh token not found");
        }
        if(validateToken(currentRefreshToken)){
            return currentRefreshToken
        }
        const response: AxiosResponse = await axios.post<{ refreshToken: string }>("/api/refresh-token", { refreshToken: currentRefreshToken });
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return accessToken
    } catch {
        console.error("Token refresh failed");
        localStorage.clear();
        window.location.href = "/sign-in";
        throw new Error("Token refresh failed");
    }
};

export default API;
