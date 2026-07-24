import {apiClient, refreshClient} from '@/api/client'
import type {AuthResponseDto, LoginDto, RegisterDto, TokenPairDto, UserEntity} from '@/api/types'

export const authService = {
    async refresh(refreshToken: string): Promise<TokenPairDto> {
        const {data} = await refreshClient.post<TokenPairDto>('/auth/refresh', {refreshToken})
        return data
    },

    async me(): Promise<UserEntity> {
        const {data} = await apiClient.get<UserEntity>('/auth/me')
        return data
    },

    async login(payload: LoginDto): Promise<AuthResponseDto> {
        const {data} = await apiClient.post<AuthResponseDto>('/auth/login', payload)
        return data
    },

    async register(payload: RegisterDto): Promise<AuthResponseDto> {
        const {data} = await apiClient.post<AuthResponseDto>("/auth/register", payload)
        return data
    }
    
}  