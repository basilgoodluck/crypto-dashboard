import axios from "axios";
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
    axios.post("/api/auth/sign-up", userData);

export const signIn = (userData: FormData2) => 
    axios.post("/api/auth/sign-in", userData);
