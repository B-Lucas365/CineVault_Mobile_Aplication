export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
}

export type AppTabParamList = {
    Home: undefined;
    Search: undefined;
    Saved: undefined;
    Profile: undefined
}

export type AppStackParamList = {
    Tabs: undefined;
    MovieDetail: {tmdbId: number, mediaType: 'movie' | 'tv'}
}