import {View, StyleSheet, type ViewProps} from 'react-native'
import { SafeAreaView, type Edge} from 'react-native-safe-area-context'
import {colors} from '@/theme/tokens'

interface Props extends ViewProps {
    edges?: Edge[],
    transparent?: boolean
}

export const Screen = ({children, style, edges = ['top', 'bottom'], transparent, ...rest}: Props) => {
    return (
        <SafeAreaView style={[styles.safe, transparent && {backgroundColor: 'transparent'}]} edges={edges}>
            <View style={[styles.content, style]}{...rest}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {flex: 1}
})