import axios from "axios";
import Config from "react-native-config";

export const tmdbClient = axios.create({
    baseURL: Config.TMDB_BASE_URL,
    timeout: 15000,
    headers: {
        Authorization: `Bearer ${Config.TMDB_READ_TOKEN}`,
        Accept: 'aplication/json'
    }
})