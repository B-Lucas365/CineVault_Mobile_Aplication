import {tokenService} from '@/lib/tokenService'
import { authService } from './api/authService'
import { useAuthStore } from '@/store/authStore'

export async function bootstrapSession(): Promise<void> {
    const {setSession, clearSession} = useAuthStore.getState()
    const refreshToken = await tokenService.getRefreshToken()

    if(!refreshToken) {
        clearSession()
        return 
    }

    try {
        const tokens = await authService.refresh(refreshToken)
        await tokenService.saveTokens(tokens.accessToken, tokens.refreshToken)

        const user = await authService.me()
        setSession(user)

    } catch {
        await tokenService.clearTokens()
        clearSession()
    }

}