import {z} from 'zod'

export const loginSchema = z.object({
    email: z.email({error: 'Digite um email Válido'}),
    password: z.string().min(8, {error: 'A senha precisa ter no mínimo 8 caracteres'})
})

export type LoginFormData = z.infer<typeof loginSchema>