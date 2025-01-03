import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

interface FormData {
    name: string;
    email: string;
    password: string;
}

interface FormData2 {
    email: string;
    password: string;
}

export const signUp = (userData: FormData) => 
    API.post("/api/auth/sign-up", userData);

export const signIn = (userData: FormData2) => 
    API.post("/api/auth/sign-in", userData);
