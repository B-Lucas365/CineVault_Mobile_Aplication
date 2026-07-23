import {type ReactNode} from 'react'
import {ImageBackground, Platform, StyleSheet, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Screen } from '../Screen/screen'
import {colors, spacing} from "@/theme/tokens"

const BACKGROUND_IMAGE = "https://image.tmdb.org/t/p/w780/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg"

export function AuthBackground({children}: {children: ReactNode}) {
    return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
            <ImageBackground
            source={{uri: BACKGROUND_IMAGE}}
            style={StyleSheet.absoluteFill}
            blurRadius={Platform.select({ios: 20, android: 12})}
            resizeMode='cover'
            >
                <LinearGradient 
                colors={[colors.overlayGradientStart, colors.overlayGradientEnd]}
                style={StyleSheet.absoluteFill}
                />
            </ImageBackground>

            <Screen transparent style={{padding: spacing.xl, justifyContent:'center'}}>
                {children}
            </Screen>
        </View>
    )
}