import { tmdbClient } from "@/api/tmdbClient";
import type {TMDBMovie, TMDBPaginatedResponse} from "@/api/tmdb/types"

export const tmdbService = {
    async getPopularMovies(page = 1): Promise<TMDBPaginatedResponse<TMDBMovie>> {
        const {data} = await tmdbClient.get<TMDBPaginatedResponse<TMDBMovie>>("/movie/popular", {
            params: {page, language: "pt-BR"}
        })

        return data
    } 
}