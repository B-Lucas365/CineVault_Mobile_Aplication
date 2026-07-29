import { ScrollView, ActivityIndicator, View } from 'react-native';
import { Screen } from '@/components/Screen/screen';
import { Text } from '@/components/Text/Text';
// import { HeroCarousel } from '../components/HeroCarousel';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { colors } from '@/theme/tokens';
import { HeroCarousel } from '../components/HeroCarousel';

export function HomeScreen() {
  const { data, isLoading, error } = usePopularMovies();

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

  return (
    <Screen edges={[]} style={{ padding: 0 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroCarousel movies={data.results.slice(0, 8)} />
        <View style={{ height: 400 }} />
        {/* Trilhos entram na Aula 2.3, aqui embaixo */}
      </ScrollView>
    </Screen>
  );
}