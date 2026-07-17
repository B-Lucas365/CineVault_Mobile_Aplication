import { isAxiosError } from 'axios';

export interface ApiError {
  statusCode: number;
  message: string;
}

export function parseApiError(error: unknown): ApiError {
  if (isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const data = error.response?.data as { message?: string | string[] } | undefined;

    const rawMessage = data?.message;
    const message = Array.isArray(rawMessage) ? rawMessage.join(', ') : rawMessage;

    if (status === 0) {
      return { statusCode: 0, message: 'Sem conexão. Verifique sua internet.' };
    }

    return { statusCode: status, message: message ?? 'Algo deu errado. Tente novamente.' };
  }

  return { statusCode: 0, message: 'Erro inesperado.' };
}