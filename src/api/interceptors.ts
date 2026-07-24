import { apiClient } from "./client";
import { tokenService } from "@/lib/tokenService";
import { authService } from "@/features/auth/api/authService";
import { useAuthStore } from "@/store/authStore";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";

apiClient.interceptors.request.use((config) => {
    const accessToken = tokenService.getAccessToken()
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

let isRefreshing = false
let subscribers: Array<(token: string) => void> = []

function onRefreshed(newToken: string) {
    subscribers.forEach((callback) => callback(newToken));
    subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
subscribers.push(callback);
}

interface RetriableConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
  }
  
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetriableConfig;

        // Não é 401, ou já tentamos renovar essa mesma requisição uma vez — desiste
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
        // Já existe um refresh em andamento: entra na fila, espera o token novo
            return new Promise((resolve) => {
                addSubscriber((newToken) => {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                resolve(apiClient(originalRequest));
                });
            });
        }

        originalRequest._retry = true;
            isRefreshing = true;

        try {
            const refreshToken = await tokenService.getRefreshToken();
            if (!refreshToken) throw new Error('Sem refresh token disponível');

            const tokens = await authService.refresh(refreshToken);
            await tokenService.saveTokens(tokens.accessToken, tokens.refreshToken);

            onRefreshed(tokens.accessToken);
            originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
            return apiClient(originalRequest);
        } catch (refreshError) {
            subscribers = [];
            await tokenService.clearTokens();
            useAuthStore.getState().clearSession();
            return Promise.reject(refreshError);
                } finally {
            isRefreshing = false;
        }
    },
);