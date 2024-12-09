import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3333",
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
    API.post("/auth/sign-up", userData);

export const signIn = (userData: FormData2) => 
    API.post("/auth/sign-in", userData);
