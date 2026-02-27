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
//public auth
export const postUser = (data) => publicApi.post("/user", data);
export const verifyEmail = (token) => publicApi.post("/email/verify", { token });
export const resendVerificationToken = (email) => publicApi.post("/email/resend", { email });
export const requestPasswordReset = (email) => publicApi.post("/password/forget", { email });
export const resetPassword = (email, token, password) => publicApi.post("/password/reset", { email, token, password });
//public
export const getProdutos = async () => {
  const response = await privateApi.get("/produtos");
  return response.data.content;
};
export const getCategorias = async () => {
  const response = await privateApi.get("/categorias");
  return response.data;
};
//private
export const getClientData = () => privateApi.get("/client/data");
export const createPedido = (pedidoData) => privateApi.post("/pedidos", pedidoData);
export const getOpenPedido = async () => {
  try {
    const response = await privateApi.get("/pedidos/iniciado");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // estado normal: não existe pedido iniciado
    }
    // qualquer outro erro continua sendo erro real
    throw error;
  }
};
export const finalizePedido = (pedidoId) => privateApi.patch(`/pedidos/${pedidoId}/finalize`);
//in the future