export interface TMDBMovie {
    id: number,
    title: string,
    overview: string,
    poster_path: string | null,
    backdrop_path: string | null
    release_date: string,
    vote_average: number
}

export interface TMDBPaginatedResponse<T> {
    page: number
    results: T[]
    total_page: number
    total_results: number
}

export interface TMDBPerson {
    id: number,
    name: string,
    profile_path: string | null
}

export interface TMDBSeries {
    id: number,
    name: string,
    overview: string,
    poster_path: string | null,
    backdrop_path: string | null,
    first_air_date: string,
    vote_avarage: number,
}