import { tokenService } from '@/lib/tokenService';
import { authService } from './api/authService';
import { useAuthStore } from '@/store/authStore';

export async function logout(): Promise<void> {
  const refreshToken = await tokenService.getRefreshToken();

  if (refreshToken) {
    try {
      await authService.logout(refreshToken);
    } catch {
    }
  }

  await tokenService.clearTokens();
  useAuthStore.getState().clearSession();
}