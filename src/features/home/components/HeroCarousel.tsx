import {Dimensions, ImageBackground, StyleSheet, View, FlatList} from "react-native"
import { Text } from "@/components/Text/Text"
import { spacing } from "@/theme/tokens"
import type {TMDBMovie} from "@/api/tmdb/types"
import LinearGradient from "react-native-linear-gradient"
import { Button } from "@/components/Button/Button"
import {Play, Plus} from "lucide-react-native"

const {width: screen_width} = Dimensions.get("window")
const hero_height = 452
const tmdb_image_base = "https://image.tmdb.org/t/p/original"

interface Props {
    movies: TMDBMovie[]
}

export function HeroCarousel({movies}: Props) {
    return(
        <FlatList 
        data={movies}
        keyExtractor={(item) => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <HeroSlider movie={item}/>}
        />
    )
}

function HeroSlider({movie}: {movie: TMDBMovie}) {
    const imageUrl = movie.backdrop_path ? `${tmdb_image_base}${movie.backdrop_path}` : undefined

    return (
        <View style={{width: screen_width, height: hero_height}}>
            <ImageBackground 
            source={{uri: imageUrl}} 
            style={StyleSheet.absoluteFill} 
            resizeMode="cover"
            >
                <LinearGradient 
                colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']}
                locations={[0, 0.3, 1]}
                style={StyleSheet.absoluteFill}
                />
            </ImageBackground>  

            <View style={styles.slideContent}>
                <Text variant="display" numberOfLines={2}>
                    {movie.title}
                </Text>

                <View style={styles.actionsRow}>
                    <View style={{flex: 1}}>
                        <Button label="Play" onPress={() => {}} icon={Play} />
                    </View>

                    <View style={{flex: 1}}>
                        <Button label="Watchlist" variant="secondary" onPress={() => {}} icon={Plus}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    slideContent: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: spacing.xl,
      paddingHorizontal: spacing.xl,
      gap: spacing.lg,
    },
    actionsRow: {
      flexDirection: 'row',
      gap: spacing.md,
    },
  });