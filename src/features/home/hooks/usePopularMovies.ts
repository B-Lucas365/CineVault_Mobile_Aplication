import { useQuery } from "@tanstack/react-query";
import { tmdbService } from "../api/tmdbService";

export function usePopularMovies() {
    return useQuery({
        queryKey: ['movie', 'popular'],
        queryFn: () => tmdbService.getPopularMovies()
    })
}