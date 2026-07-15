import {View, StyleSheet, type ViewProps} from 'react-native'
import { SafeAreaView, type Edge} from 'react-native-safe-area-context'
import {colors} from '@/theme/tokens'

interface Props extends ViewProps {
    edges?: Edge[]
}

export const Screen = ({children, style, edges = ['top', 'bottom']}: Props) => {
    return (
        <SafeAreaView style={styles.safe} edges={edges}>
            <View style={[styles.content, style]}>
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