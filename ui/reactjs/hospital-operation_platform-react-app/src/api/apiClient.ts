import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api/v1",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.info(
      `[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
    );

    return config;
  },
  (error) => {
    console.error("[API REQUEST ERROR]", error);

    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    console.info(
      `[API RESPONSE] ${response.status} ${response.config.url}`,
    );

    return response;
  },
  (error) => {
    console.error(
      "[API RESPONSE ERROR]",
      error.response?.data ?? error.message,
    );

    return Promise.reject(error);
  },
);

export default apiClient;