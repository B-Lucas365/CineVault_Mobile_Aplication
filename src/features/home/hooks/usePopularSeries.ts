import { useQuery } from "@tanstack/react-query";
import { tmdbService } from "../api/tmdbService";

export function usePopularSeries() {
    return useQuery({
        queryKey: ['series', 'popular'],
        queryFn: () => tmdbService.getPopularSeries()
    })
}