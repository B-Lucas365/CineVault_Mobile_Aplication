import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { type AppStackParamList, type AppTabParamList } from "./types";
import { View } from "react-native";
import { Text } from "@/components/Text/Text";
import { Screen } from "@/components/Screen/screen";

const Stack = createNativeStackNavigator<AppStackParamList>()
const Tab = createBottomTabNavigator<AppTabParamList>()

function ScreenPlaceholder({ label }: { label: string }) {
    return (
      <Screen style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{label}</Text>
      </Screen>
    );
}

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home">{() => <ScreenPlaceholder label="home"/>}</Tab.Screen>
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