import axios from "axios";

// Axios instance with dynamic baseURL
const API = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : undefined, // Use proxy in development
});

// Interfaces for form data
interface FormData {
    name: string;
    email: string;
    password: string;
}

interface FormData2 {
    email: string;
    password: string;
}

// API methods for authentication
export const signUp = (userData: FormData) => 
    API.post("/api/auth/sign-up", userData);

export const signIn = (userData: FormData2) => 
    API.post("/api/auth/sign-in", userData);
