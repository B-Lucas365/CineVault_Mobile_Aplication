import { useState } from "react";
import {View, KeyboardAvoidingView, ScrollView, Platform, Pressable, StyleSheet} from "react-native"
import {useForm, Controller} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type AuthStackParamList } from "@/navigation/types";
import { AuthBackground } from "@/components/AuthBackground/AuthBackground";
import { AvatarInitials } from "@/components/AvatarInitals/AvatarInitials";
import { Text } from "@/components/Text/Text";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { registerSchema, type RegisterFormData } from "../schemas/registerSchema";
import { authService } from "../api/authService";
import { tokenService } from "@/lib/tokenService";
import { useAuthStore } from "@/store/authStore";
import { parseApiError } from "@/api/erros";
import { colors, radius, spacing } from "@/theme/tokens";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">

export function RegisterScreen({navigation}: Props) {
    const [submitError, setSubmitError] = useState<string | null>(null)
    const setSession = useAuthStore((state) => state.setSession)

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmePassword: "",
            acceptTerms: false
        }
    })

    async function onSubmit(data: RegisterFormData) {
        setSubmitError(null)

        try {
            const auth = await authService.register({
                fullName: data.fullname,
                email: data.email,
                password: data.password
            })
            await tokenService.saveTokens(auth.accessToken, auth.refreshToken)
            setSession(auth.user)
        } catch(error){
            setSubmitError(parseApiError(error).message)
        }
    }

    return (
        <AuthBackground>
            <KeyboardAvoidingView
            behavior={Platform.select({ios: 'padding', android: undefined})}
            style={{flex: 1, justifyContent: "center"}}
            >
                <ScrollView
                contentContainerStyle={{flexGrow: 1, justifyContent: "center"}}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                >
                    <View style={styles.card}>
                        <Text variant="title" style={{textAlign: "center", marginBottom: spacing.lg}}>
                            Create account
                        </Text>

                        <AvatarInitials control={control}/>

                        <View style={{gap: spacing.md, marginTop: spacing.lg}}>
                            <Controller 
                            control={control}
                            name="fullname"
                            render={({field}) => (
                                <Input 
                                placeholder="Full Name"
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                error={errors.fullname?.message}
                                autoCapitalize="words"
                                />
                            )}
                            />

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

                            <Controller
                                control={control}
                                name="confirmePassword"
                                render={({ field }) => (
                                    <Input
                                        placeholder="Confirm password"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        error={errors.confirmePassword?.message}
                                        secureTextEntry
                                    />
                                )}
                            />

                            <Controller 
                                control={control}
                                name="acceptTerms"
                                render={({field}) => (
                                    <View style={styles.termsRow}>
                                        <Pressable 
                                            onPress={() => field.onChange(!field.value)}
                                            style={[styles.checkbox, field.value && styles.checkboxChecked]}
                                        />
                                        <Text variant="caption" color="tertiary" style={{flex: 1}}>
                                            I agree to the{' '}
                                            <Text variant="caption" style={{color: colors.textPrimary}}>Terms</Text> and{' '}
                                            <Text variant="caption" style={{color: colors.textPrimary}}>Privacy Policy</Text>
                                        </Text>
                                    </View>
                                )}
                            />

                            {errors.acceptTerms && (
                            <Text variant="caption" style={{ color: '#ff6b6b', marginTop: spacing.xs }}>
                                {errors.acceptTerms.message}
                            </Text>
                            )}

                            {submitError && (
                            <Text variant="caption" style={{ color: '#ff6b6b', marginTop: spacing.sm }}>
                                {submitError}
                            </Text>
                            )}

                            <View style={{marginTop: spacing.lg}}>
                                <Button label="Create Account" onPress={handleSubmit(onSubmit)} loading={isSubmitting}/>
                            </View>

                            <Text variant="caption" color="tertiary" style={{textAlign: 'center', marginTop: spacing.lg }}>
                                Already have an account?{' '}
                                <Text 
                                variant="caption" 
                                style={{color: colors.textPrimary, fontWeight: "500"}} 
                                onPress={() => navigation.navigate('Login')}
                                >
                                    Sign in
                                </Text>
                            </Text>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </AuthBackground>
    )
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.glassCard,
      borderRadius: radius.xxl,
      padding: spacing.xl,
    },
    termsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: radius.sm,
      borderWidth: 1,
      borderColor: colors.borderStrong,
      backgroundColor: colors.surface,
      marginTop: 1,
    },
    checkboxChecked: {
      backgroundColor: colors.textPrimary,
      borderColor: colors.textPrimary,
    },
  });