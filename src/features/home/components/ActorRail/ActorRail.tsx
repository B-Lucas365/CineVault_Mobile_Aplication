import {View, FlatList, Image, Pressable, ActivityIndicator, StyleSheet} from "react-native"
import {Text} from "@/components/Text/Text"
import { colors, spacing } from "@/theme/tokens"
import type { TMDBPerson } from "@/api/tmdb/types"

const TMDB_PROFILE_BASE = 'https://image.tmdb.org/t/p/w185';
const AVATAR_SIZE = 72;

interface Props {
    people: TMDBPerson[]
    isLoading?: boolean
    isError?: boolean
    onRetry?: () => void
}

export function ActorRail({people, isLoading, isError, onRetry}: Props) {
    return(
        <View style={{paddingTop: spacing.xxl}}>
            {isLoading ? (
                <View style={{ flexDirection: 'row', gap: spacing.lg, paddingHorizontal: spacing.xl }}>
                {[1, 2, 3, 4, 5].map((key) => (
                  <AvatarSkeleton key={key} />
                ))}
              </View>
            ) : isError ? (
              <View style={{paddingHorizontal: spacing.xl}}>
                  <RetryTrip onRetry={onRetry}/>
              </View>
            ) : (
                <FlatList 
                data={people}
                keyExtractor={(item) => String(item.id)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap: spacing.lg, paddingHorizontal: spacing.xl}}
                renderItem={({item}) => <ActorAvatar person={item}/>}
                />
            )}
        </View>
    )
}

function ActorAvatar({ person }: { person: TMDBPerson }) {
    const imageUrl = person.profile_path ? `${TMDB_PROFILE_BASE}${person.profile_path}` : undefined;
  
    function handlePress() {
      // Navegação para o detalhe do ator entra no Módulo 3 (item 3.6) — combinado anteriormente
    }
  
    return (
      <Pressable onPress={handlePress} style={styles.wrapper}>
        <View style={styles.circle}>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        </View>
        <Text variant="caption" numberOfLines={1} style={styles.name}>
          {person.name}
        </Text>
      </Pressable>
    );
  }
  
  function AvatarSkeleton() {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.circle, styles.centered]}>
          <ActivityIndicator size="small" color={colors.textTertiary} />
        </View>
      </View>
    );
  }
  
  function  RetryTrip({onRetry}: {onRetry?: () => void}) {
    return (
      <Pressable
      onPress={onRetry} style={[styles.wrapper, styles.centered, {height: AVATAR_SIZE}]}
      >
        <Text variant="caption" color="secondary" style={{textAlign: 'center'}}>
          Tentar de novo
        </Text>
      </Pressable>
    )
  }
  
  const styles = StyleSheet.create({
    wrapper: {
      width: AVATAR_SIZE,
      alignItems: 'center',
    },
    circle: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius: AVATAR_SIZE / 2,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    centered: {alignItems: 'center', justifyContent: 'center'},
    image: {
      width: '100%',
      height: '100%',
    },
    name: {
      marginTop: spacing.sm,
      textAlign: 'center',
    },
  });