import { View, FlatList, Image,  StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { Text } from "@/components/Text/Text";
import { colors, radius, spacing } from "@/theme/tokens";
import type {PosterItem} from "./types"
import {FlashList} from "@shopify/flash-list"

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';
const POSTER_WIDTH = 122;
const POSTER_HEIGHT = 183;

interface Props {
    title: string,
    items: PosterItem[]
    isLoading?: boolean
    isError?: boolean
    onRetry?: () => void
}

export function PosterRail({title, items, isLoading, isError, onRetry}: Props) {
    return(
        <View style={{paddingTop: spacing.xl}}>
            <Text variant="title" style={{paddingHorizontal: spacing.xl, marginBottom: spacing.md}}>
                {title}
            </Text>
            {isLoading ? (
                <SkeletonRow />
            ) : isError ? (
                <RetryRow onRetry={onRetry}/>
            ) : items.length === 0 ? (
                <EmptyRow />
            ) : (
               <FlashList 
               data={items}
               keyExtractor={(item) => String(item.id)}
               horizontal
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{paddingHorizontal: spacing.xl}}
               ItemSeparatorComponent={() => <View style={{width: 13}}/>}
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
        <View style={[styles.card, styles.centered]}>
            <ActivityIndicator color={colors.textTertiary} />
        </View>
    )
}

function RetryRow({onRetry}: {onRetry?: () => void}) {
    return(
        <View style={{paddingHorizontal: spacing.xl}}>
            <Pressable
            onPress={onRetry}
            style={[styles.card, styles.centered, {width: '100%', height: 80}]}
            >
                <Text color="secondary">Não foi possivel carregar. toque para tentar de novo</Text>
            </Pressable>
        </View>
    )
}

function EmptyRow() {
    return (
        <View style={{paddingHorizontal: spacing.xl}}>
            <Text color="tertiary">Nada por aqui ainda.</Text>

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
    centered: {alignItems: 'center', justifyContent: 'center'},
    image: {
      width: '100%',
      height: '100%',
    },
});