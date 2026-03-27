import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().optional(),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
})

export type RegisterData = z.infer<typeof registerSchema>