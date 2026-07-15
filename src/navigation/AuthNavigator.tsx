import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { type AuthStackParamList } from "./types";

import { View } from "react-native";
import { Text } from "@/components/Text/Text";
import { colors } from "@/theme/tokens";
import { Screen } from "@/components/Screen/screen";

const Stack = createNativeStackNavigator<AuthStackParamList>()

const LoginPlaceholder = () => {
    return (
        <Screen style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Login (placeholder)</Text>
        </Screen>
    )
}

function RegisterPlaceholder() {
    return (
      <Screen style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Register (placeholder)</Text>
      </Screen>
    );
  }

  export const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginPlaceholder}/>
            <Stack.Screen name="Register" component={RegisterPlaceholder}/>
        </Stack.Navigator>

    )
  }