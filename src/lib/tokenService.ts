import * as keychain from 'react-native-keychain'
import { storage } from './storage'

const ACCESS_TOKEN_KEY = 'accessToken'
const KEYCHAIN_SERVICE = 'cinevault-refresh-token'

export const tokenService = {
    getAccessToken(): string | undefined {
        return storage.getString(ACCESS_TOKEN_KEY)
    },

    setAccessToken(token: string):void {
        storage.set(ACCESS_TOKEN_KEY, token)
    },

    clearAccessToken():void {
    storage.remove(ACCESS_TOKEN_KEY)
    },

    async getRefreshToken():Promise<string | null> {
        const credentials = await keychain.getGenericPassword({service: KEYCHAIN_SERVICE})
        return credentials ? credentials.password : null
    },

    async setRefreshToken(token:string): Promise<void> {
        await keychain.setGenericPassword('coneVault', token, {service: KEYCHAIN_SERVICE})
    },

    async clearRefreshToken(): Promise<void> {
        await keychain.resetGenericPassword({service: KEYCHAIN_SERVICE})
    },

    async saveTokens(accessToken: string, refreshToken: string): Promise<void>{
        this.setAccessToken(accessToken)
        await this.setRefreshToken(refreshToken)
    },

    async clearTokens(): Promise<void> {
        this.clearAccessToken()
        await this.clearRefreshToken()
    }
}