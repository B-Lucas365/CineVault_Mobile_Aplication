declare module 'react-native-config' {
    interface NativeConfig {
        API_BASE_URL: string;
        TMDB_READ_TOKEN: string;
        TMDB_BASE_URL: string;
    }
    export const Config: NativeConfig;
    export default Config;
}