import { useEffect, useRef } from "react";
import { View, FlatList, Image, Animated, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "@/components/Text/Text";
import { colors, radius, spacing } from "@/theme/tokens";
import type {PosterItem} from "./types"

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';
const POSTER_WIDTH = 122;
const POSTER_HEIGHT = 183;

interface Props {
    title: string,
    items: PosterItem[]
    isLoading?: boolean
}

export function PosterRail({title, items, isLoading}: Props) {
    return(
        <View style={{paddingTop: spacing.xl}}>
            <Text variant="title" style={{paddingHorizontal: spacing.xl, marginBottom: spacing.md}}>
                {title}
            </Text>
            {isLoading ? (
                <SkeletonRow />
            ) : (
                <FlatList 
                data={items}
                keyExtractor={(item) => String(item.id)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap: 13, paddingHorizontal: spacing.xl}}
                renderItem={({item}) => <PosterCard item={item}/>}
                
                />
            )} 
        </View>
    )
}

function PosterCard({item}: {item: PosterItem}) {
    const imageUrl = item.posterPath ? `${TMDB_IMAGE_BASE}${item.posterPath}` : undefined

    return (
        <View style={styles.card}>
            <Image source={{uri: imageUrl}} style={styles.image} resizeMode="cover"/>
        </View>
    )
}

function SkeletonRow() {
    return(
        <View style={{flexDirection: 'row', gap: 13, paddingHorizontal: spacing.xl}}>
            {[1,2,3,4].map((key) => (
                <SkeletonCard key={key}/>
            ))}
        </View>
    )
}


function SkeletonCard() {
    return(
        <View style={[styles.card, { alignItems: 'center', justifyContent: 'center' }]}>
            <ActivityIndicator color={colors.textTertiary} />
        </View>
    )
  }

const styles = StyleSheet.create({
    card: {
      width: POSTER_WIDTH,
      height: POSTER_HEIGHT,
      borderRadius: radius.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });