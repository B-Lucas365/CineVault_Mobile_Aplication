import {z} from 'zod'

export const registerSchema = z
.object({
    fullname: z.string().min(2, {error: 'Nome precisa ter no mínimo 2 caracteres'}),
    email: z.email({error: "Digite um email válido"}),
    password: z.string().min(8, {error: "A senha precisa ter no mínimo 8 caracteres"}),
    confirmePassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
        error: "Você precisa aceitar os termos para continuar"
    }),    
})
.refine((data) => data.password === data.confirmePassword, {
    error: 'As senhas não coincidem',
    path: ['confirmePassword']
})

export type RegisterFormData = z.infer<typeof registerSchema>