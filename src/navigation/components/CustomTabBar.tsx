import {View, Pressable, StyleSheet} from "react-native"
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import {Home, Search, Bookmark, User, Route} from "lucide-react-native"
import { colors, radius, spacing } from "@/theme/tokens"
import { Text } from "@/components/Text/Text"

const icons: Record<string, typeof Home> = {
    Home: Home,
    Search: Search,
    Saved: Bookmark,
    Profile: User
}

export function CustomTabBar({state, navigation}: BottomTabBarProps) {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index
                const Icon = icons[route.name]
                
                function handlePress() {
                    navigation.navigate(route.name)
                }

                return (
                    <Pressable key={route.key} onPress={handlePress} style={styles.item}>
                        {Icon && (
                            <Icon 
                            size={22}
                            color={isFocused ? colors.textPrimary : colors.textTertiary}
                            fill={isFocused ? colors.textPrimary : "none"}
                            />
                        )}
                        {isFocused &&  (
                            <Text variant="caption" style={styles.label}>
                                {route.name}
                            </Text>
                        )}
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 14,
      flexDirection: 'row',
      backgroundColor: 'rgba(28,28,30,0.72)',
      borderRadius: radius.xxl,
      paddingVertical: 9,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    item: {
      flex: 1,
      alignItems: 'center',
      gap: 2,
      paddingVertical: 5,
      paddingHorizontal: 14
    },
    label: {
        fontSize: 10,
        fontWeight: '500',
        color: colors.textPrimary
    }
});