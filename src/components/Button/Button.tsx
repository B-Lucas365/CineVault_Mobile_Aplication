import { Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "../Text/Text";
import { colors, spacing, radius } from "@/theme/tokens";

type Variant = 'primary' | 'secondary'

interface Props {
    label: string;
    onPress: () => void;
    variant?: Variant;
    loading?: boolean;
    disabled?: boolean
}

export const Button = ({label, onPress, variant = 'primary', loading, disabled}: Props) => {
    const isPrimary = variant === 'primary'

    return (
        <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={({pressed}) => [
            styles.base,
            isPrimary ? styles.primary : styles.secondary,
            (disabled || loading) && styles.disabled,
            pressed && styles.pressed
        ]}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? colors.buttonPrimaryText : colors.textPrimary}/>
            ) : (
                <Text
                variant='title'
                color={isPrimary ? undefined : 'primary'}
                style={isPrimary && {color: colors.buttonPrimaryText}}
                >
                    {label}
                </Text>
            )}

        </Pressable>
    )
}

const styles = StyleSheet.create({
    base: {
        height: 50,
        borderRadius: radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.lg
    },
    primary: {
        backgroundColor: colors.buttonPrimaryBg
    },
    secondary: {
        backgroundColor: colors.buttonSecondaryBg,
        borderWidth: 1,
        borderColor: colors.borderStrong,
    },
    disabled: {
        opacity: 0.5
    }, 
    pressed: {opacity: 0.8}

})