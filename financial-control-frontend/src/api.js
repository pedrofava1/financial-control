import axios from "axios";

// Criando instância do axios
const api = axios.create({
  baseURL: "http://localhost:8080", // URL do backend
});

// Interceptador para adicionar o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Pegando o token salvo no login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adicionando no cabeçalho
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
