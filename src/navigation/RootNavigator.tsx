import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./AuthNavigator";
import { AppNavigator } from "./AppNavigator";
import { useEffect } from "react";
import { Splash } from "@/components/Splash/Splash";
import { useAuthStore } from "@/store/authStore";
import { bootstrapSession } from "@/features/auth/bootstrapSession";


export const RootNavigator = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const isBootstrapping = useAuthStore((state) => state.isBootstrapping)

    useEffect(() => {
        bootstrapSession()
    }, [])

    if (isBootstrapping) {
        return <Splash />
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}