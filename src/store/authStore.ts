import {create} from 'zustand'
import type { UserEntity } from '@/api/types'

interface AuthState {
    user: UserEntity | null;
    isAuthenticated: boolean;
    isBootstrapping: boolean;
    setSession: (user: UserEntity) => void;
    clearSession: () => void;
    setBootstrapping: (value: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isBootstrapping: true,
    setSession: (user) => set({ user, isAuthenticated: true, isBootstrapping: false }),
    clearSession: () => set({ user: null, isAuthenticated: false, isBootstrapping: false }),
    setBootstrapping: (value) => set({ isBootstrapping: value }),
}))