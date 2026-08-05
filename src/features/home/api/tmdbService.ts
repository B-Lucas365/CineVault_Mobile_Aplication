import { tmdbClient } from "@/api/tmdbClient";
import type {TMDBMovie, TMDBPaginatedResponse, TMDBPerson, TMDBSeries} from "@/api/tmdb/types"

export const tmdbService = {
    async getPopularMovies(page = 1): Promise<TMDBPaginatedResponse<TMDBMovie>> {
        const {data} = await tmdbClient.get<TMDBPaginatedResponse<TMDBMovie>>("/movie/popular", {
            params: {page, language: "pt-BR"}
        })

        return data
    },
    
    async getPopularActors(page = 1): Promise<TMDBPaginatedResponse<TMDBPerson>> {
        const {data} = await tmdbClient.get<TMDBPaginatedResponse<TMDBPerson>>("/person/popular", {
            params: {page, Language: "pt-BR"}
        })
        return data
    },

    async getPopularSeries(page = 1): Promise<TMDBPaginatedResponse<TMDBSeries>> {
        const {data} = await tmdbClient.get<TMDBPaginatedResponse<TMDBSeries>>("/tv/popular", {
            params: {page, language: "pt-BR"}
        })

        return data
    }

}