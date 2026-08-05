import { ScrollView, ActivityIndicator, View } from 'react-native';
import { Screen } from '@/components/Screen/screen';
import { Text } from '@/components/Text/Text';
// import { HeroCarousel } from '../components/HeroCarousel';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { colors } from '@/theme/tokens';
import { HeroCarousel } from '../components/HeroCarousel';
import { PosterRail } from '../components/PosterRail/PosterRail';
import { usePopularActors } from '../hooks/usePopularActors';
import { ActorRail } from '../components/ActorRail/ActorRail';
import { usePopularSeries } from '../hooks/usePopularSeries';

export function HomeScreen() {
  const { data, isLoading, error } = usePopularMovies();
  const {data: actorData, isLoading: isLoadingActor} = usePopularActors()
  const { data: seriesData, isLoading: isLoadingSeries} = usePopularSeries()

  if (isLoading) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.textPrimary} />
      </Screen>
    );
  }

  if (error || !data) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text color="secondary">Não foi possível carregar os filmes.</Text>
      </Screen>
    );
  }

  const posterItems = data?.results.slice(0, 10).map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path
  }))

  const seriesItems = (seriesData?.results ?? []).slice(0.10).map((series) => ({
    id: series.id,
    title: series.name,
    posterPath: series.poster_path
  }))

  return (
    <Screen edges={[]} style={{ padding: 0 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroCarousel movies={data.results.slice(0, 8)} />
        <ActorRail people={actorData?.results ?? []} isLoading={isLoadingActor}/>
        <PosterRail title='Top Movies' items={posterItems} isLoading={isLoading}/>
        <PosterRail title='Top Series' items={seriesItems} isLoading={isLoadingSeries}/>
        <View style={{ height: 400 }} />
      </ScrollView>
    </Screen>
  );
}