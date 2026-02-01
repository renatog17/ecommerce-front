import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;



const publicApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
}); 

const privateApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
}); 

// Auth
export const loginRequest = (email, password) => authApi.post("/auth/login", { email, password });
export const logoutRequest = () => authApi.post("/auth/logout");
export const checkLoginRequest = () => authApi.get("/auth/check");
//public
export const postUser = (data) => publicApi.post("/user", data);
export const verifyEmail = (token) => publicApi.post("/email/verify", { token });
export const resendVerificationToken = (email) => publicApi.post("/email/resend", { email });
export const requestPasswordReset = (email) => publicApi.post("/password/forget", { email });
export const resetPassword = (email, token, password) => publicApi.post("/password/reset", { email, token, password });
//private
//in the future