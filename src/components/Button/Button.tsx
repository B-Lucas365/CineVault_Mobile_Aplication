import { Pressable, StyleSheet, ActivityIndicator, View } from "react-native";
import { Text } from "../Text/Text";
import { colors, spacing, radius } from "@/theme/tokens"
import type {LucideIcon} from "lucide-react-native"

type Variant = 'primary' | 'secondary'

interface Props {
    label: string;
    onPress: () => void;
    variant?: Variant;
    loading?: boolean;
    disabled?: boolean
    icon?: LucideIcon
}

export const Button = ({label, onPress, variant = 'primary', loading, disabled, icon: Icon}: Props) => {
    const isPrimary = variant === 'primary'
    const iconColor = isPrimary ? colors.buttonPrimaryText : colors.textPrimary;

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
                <View style={styles.content}>
                    {Icon && <Icon size={18} color={iconColor} strokeWidth={2.2} fill={iconColor}/>}
                    <Text
                    variant='title'
                    color={isPrimary ? undefined : 'primary'}
                    style={isPrimary && {color: colors.buttonPrimaryText}}
                    >
                        {label}
                    </Text>
                </View>
                
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
    pressed: {opacity: 0.8},
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
      },

})