import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { type AppStackParamList, type AppTabParamList } from "./types";
import { View } from "react-native";
import { Text } from "@/components/Text/Text";
import { Screen } from "@/components/Screen/screen";
import { Button } from "@/components/Button/Button";
import { logout } from "@/features/auth/logout";
import { HomeScreen } from "@/features/home/screens/HomeScreen";
import { CustomTabBar } from "./components/CustomTabBar";

const Stack = createNativeStackNavigator<AppStackParamList>()
const Tab = createBottomTabNavigator<AppTabParamList>()

function ScreenPlaceholder({ label }: { label: string }) {
    return (
        <Screen>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Text>{label}</Text>
          {label === 'Home' && <Button label="Sair" onPress={logout} />}
        </View>
      </Screen>
    );
}

const Tabs = () => {
    return (
        <Tab.Navigator 
        screenOptions={{headerShown: false}}
        tabBar={(props) => <CustomTabBar {...props}/>}
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Saved">{() => <ScreenPlaceholder label="Saved"/>}</Tab.Screen>
            <Tab.Screen name="Search">{() => <ScreenPlaceholder label="Search"/>}</Tab.Screen>
            <Tab.Screen name="Profile">{()=> <ScreenPlaceholder label="Profile"/>}</Tab.Screen>
        </Tab.Navigator>
    )
}

export const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Tabs" component={Tabs}/>
            <Stack.Screen name="MovieDetail">{() => <ScreenPlaceholder label="Mmovie Detail"/>}</Stack.Screen>
        </Stack.Navigator>
    )
}