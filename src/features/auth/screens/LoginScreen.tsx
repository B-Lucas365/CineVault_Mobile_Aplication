import { useState } from "react";
import { View } from "react-native";
import {useForm, Controller} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Screen } from "@/components/Screen/screen";
import { Text } from "@/components/Text/Text";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { authService } from "../api/authService";
import { tokenService } from "@/lib/tokenService";
import { useAuthStore } from "@/store/authStore";
import { parseApiError } from "@/api/erros";
import { StyleSheet } from "react-native";

export function LoginScreen() {
    const [submitError, setSubmitError] = useState<string | null>(null)
    const setSession = useAuthStore((state) => state.setSession)

    const {
        control, 
        handleSubmit, 
        formState: {errors, isSubmitting}
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: '', password: ''}
    })

    async function onSubmit(data: LoginFormData) {
        setSubmitError(null);
           
        try {
            const auth = await authService.login(data)
            await tokenService.saveTokens(auth.accessToken, auth.refreshToken)
            setSession(auth.user)
        } catch(error) {
            const apiError = parseApiError(error)
            setSubmitError(apiError.message)
        }
    }

    return (
        <Screen style={styles.base}>
            <Text variant="display">CineVault</Text>

            <Controller 
                control={control}
                name="email"
                render={({field}) => (
                    <Input 
                        placeholder="Email"
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.email?.message}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                )}
            />

            <Controller 
                control={control}
                name="password"
                render={({field}) => (
                    <Input 
                        placeholder="Password"
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.password?.message}
                        secureTextEntry
                    />
                )}
            />

            {submitError && (
                <Text variant="caption" style={{color: '#ff6b6b'}}>
                    {submitError}
                </Text>
            )}

            <Button 
            label="Sign In"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            />
        </Screen>
    )
}


const styles = StyleSheet.create({
    base: {
        padding: 24,
        justifyContent: 'center',
        gap: 16
    }
})