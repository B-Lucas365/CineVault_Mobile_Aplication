import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from "react-native";
import {colors, typography} from '@/theme/tokens'

type Variant = keyof typeof typography;
type ColorToken = 'primary' | 'secondary' | 'tertiary'

interface Props extends RNTextProps {
    variant?: Variant;
    color?: ColorToken
}

const colorMap: Record<ColorToken, string> = {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
    tertiary: colors.textTertiary
}

export const Text = ({variant = 'body', color = 'primary', style, ...rest}:Props) => {
    return(
        <RNText
        style={[styles.base, typography[variant], {color: colorMap[color]}, style]}
        {...rest}/>
    )
}

const styles = StyleSheet.create({
    base: {
        fontFamily: undefined
    }
})