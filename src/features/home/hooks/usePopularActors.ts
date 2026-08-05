import { useQuery } from "@tanstack/react-query";
import { tmdbService } from "../api/tmdbService";

export function usePopularActors() {
    return useQuery({
        queryKey: ['people', 'popular'],
        queryFn: () => tmdbService.getPopularActors()
    })
}