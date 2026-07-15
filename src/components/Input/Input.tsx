import {TextInput, type TextInputProps, StyleSheet, View} from 'react-native'
import {Text} from '@/components/Text/Text'
import {colors, radius, spacing} from '@/theme/tokens'

interface Props extends TextInputProps {
    error?: string
}

export const Input = ({error, style, ...rest}: Props) => {
    return (
        <View>
            <TextInput 
            style={[styles.base, error && styles.baseError, style]}
            placeholderTextColor={colors.textTertiary}
            {...rest}
            />
            {error && (
                <Text variant='caption' color='secondary' style={styles.errorText}>
                    {error}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        height: 46,
        backgroundColor: colors.surfaceElevated,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        paddingHorizontal: spacing.lg,
        color: colors.textPrimary,
        fontSize: 15
    },
    baseError: {
        borderColor: '#ff6b6b'
    },
    errorText: {marginTop: spacing.xs, marginLeft: spacing.xs}
})