import { ActivityIndicator } from "react-native";
import { Screen } from "../Screen/screen";
import { colors } from "@/theme/tokens";

export function Splash() {
    return (
        <Screen style={{alignContent: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={colors.textPrimary}/>
        </Screen>
    )
}