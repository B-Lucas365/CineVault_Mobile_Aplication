import { RootNavigator } from "./navigation/RootNavigator";
import { useEffect } from "react";

import { apiClient } from '@/api/client';
import { parseApiError } from "./api/erros";
import { tokenService } from '@/lib/tokenService';
import { useAuthStore } from '@/store/authStore';
import type { AuthResponseDto, LoginDto } from '@/api/types';

// async function testLoginAndStore() {
//   try {
//     const payload: LoginDto = { email: 'demo@cinevault.app', password: 'demo1234' };
//     const { data } = await apiClient.post<AuthResponseDto>('/auth/login', payload);

//     await tokenService.saveTokens(data.accessToken, data.refreshToken);
//     useAuthStore.getState().setSession(data.user);

//     console.log('Access salvo:', tokenService.getAccessToken()?.slice(0, 20));
//     console.log('Refresh salvo:', (await tokenService.getRefreshToken())?.slice(0, 20));
//     console.log('Store atualizado:', useAuthStore.getState().isAuthenticated);
//   } catch (error) {
//     console.log('Erro:', parseApiError(error));
//   }
// }


function App() {
  
  // useEffect(() => {
  //   testLoginAndStore()
  // },[])

  return (
      <RootNavigator />
  );
}

export default App;
