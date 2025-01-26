import axios, { AxiosInstance } from "axios";
export const refreshToken = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
            {
                withCredentials: true,
            }
        );
        return response.data.access_token;
    } catch (error) {
        return error;
    }
};
export function useApi() {
    const headers = {
        "Content-Type": "application/json",
        "Access-control-Allow-Origin": "*",
    };

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers,
        withCredentials: true,
    });

    api.interceptors.request.use((config) => {
        return config;
    });

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response && error.response.status === 401) {
                if (
                    error.response.data.message === "User not found" ||
                    error.response.data.message === "Unactivated account" ||
                    error.response.data.message === "Token expiré" ||
                    error.response.data.message ===
                        "Pas d'access token dans le cookie"
                ) {
                    return Promise.reject(error);
                }
                if (!error.config._retry) {
                    error.config._retry = true;
                    try {
                        const newToken = await refreshToken();
                        if (!newToken) {
                            return Promise.reject(error);
                        }

                        if (newToken.access_token)
                            localStorage.setItem(
                                "access_token",
                                newToken.access_token
                            );
                        return axios(error.config);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
            }
            return Promise.reject(error);
        }
    );
    return api;
}
