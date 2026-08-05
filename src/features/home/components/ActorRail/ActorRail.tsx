import {View, FlatList, Image, Pressable, ActivityIndicator, StyleSheet} from "react-native"
import {Text} from "@/components/Text/Text"
import { colors, spacing } from "@/theme/tokens"
import type { TMDBPerson } from "@/api/tmdb/types"

const TMDB_PROFILE_BASE = 'https://image.tmdb.org/t/p/w185';
const AVATAR_SIZE = 72;

interface Props {
    people: TMDBPerson[]
    isLoading?: boolean
}

export function ActorRail({people, isLoading}: Props) {
    return(
        <View style={{paddingTop: spacing.xxl}}>
            {isLoading ? (
                <View style={{ flexDirection: 'row', gap: spacing.lg, paddingHorizontal: spacing.xl }}>
                {[1, 2, 3, 4, 5].map((key) => (
                  <AvatarSkeleton key={key} />
                ))}
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
        <View style={[styles.circle, { alignItems: 'center', justifyContent: 'center' }]}>
          <ActivityIndicator size="small" color={colors.textTertiary} />
        </View>
      </View>
    );
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
    image: {
      width: '100%',
      height: '100%',
    },
    name: {
      marginTop: spacing.sm,
      textAlign: 'center',
    },
  });