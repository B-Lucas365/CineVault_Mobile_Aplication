import { StyleSheet, View } from "react-native";
import {useWatch, type Control} from "react-hook-form"
import { Text } from "../Text/Text";
import {colors, radius} from "@/theme/tokens"
import { type RegisterFormData } from "@/features/auth/schemas/registerSchema";

function getInitials(fullName: string): string {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
    return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

export function AvatarInitials({control}: {control: Control<RegisterFormData>}) {
    const fullname = useWatch({control, name: 'fullname', defaultValue: ''})

    return (
        <View
        style={styles.avatar}
        >
            <Text variant="title">{getInitials(fullname)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 64,
        height: 64,
        borderRadius: radius.full,
        borderWidth: 1.5,
        borderColor: colors.borderStrong,
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "center"
    }
})