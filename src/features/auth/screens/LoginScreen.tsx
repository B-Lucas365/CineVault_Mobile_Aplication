import { useState } from "react";
import { ImageBackground, Platform, View } from "react-native";
import {useForm, Controller} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Text } from "@/components/Text/Text";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { authService } from "../api/authService";
import { tokenService } from "@/lib/tokenService";
import { useAuthStore } from "@/store/authStore";
import { parseApiError } from "@/api/erros";
import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@/theme/tokens";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "@/navigation/types";
import { AuthBackground } from "@/components/AuthBackground/AuthBackground";


type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>

export function LoginScreen({navigation}: Props) {
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
        <AuthBackground>
            <View style={styles.card}>
                <View style={styles.logoCircle}>
                    <Text variant="title">CV</Text>
                </View>

                <Text variant="title" style={{textAlign: 'center', marginBottom: spacing.lg}}>
                    Sign in to CineVault
                </Text>

                <View style={{gap: spacing.md}}>
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
                </View>

                {submitError && (
                    <Text variant="caption" style={{color: '#ff6b6b'}}>
                        {submitError}
                    </Text>
                )}

                <Button label="Sign in" onPress={handleSubmit(onSubmit)} loading={isSubmitting}/>

                <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                    <Text variant="caption" color="tertiary">or</Text>
                    <View style={styles.dividerLine}/>
                </View>

                <Button label="⌘  Sign in with Apple" variant="secondary" onPress={() => {}} />

                <Text variant="caption" color="tertiary" style={{ textAlign: 'center', marginTop: spacing.lg }}>
                Don't have an account?{' '}
                <Text
                    variant="caption"
                    style={{ color: colors.textPrimary, fontWeight: '500' }}
                    onPress={() => navigation.navigate("Register")}
                >
                    Sign up
                </Text>
                </Text>

            </View>
        </AuthBackground>
    )
}



const styles = StyleSheet.create({
    base: {
        padding: 24,
        justifyContent: 'center',
        gap: 16
    },
    card: {
        backgroundColor: colors.glassCard,
        borderRadius: radius.xxl,
        padding: spacing.xl,
        gap: spacing.md,
      },
      logoCircle: {
        width: 56,
        height: 56,
        borderRadius: radius.xl,
        borderWidth: 1.5,
        borderColor: colors.borderStrong,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
      },
      dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
      },
})