import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve conter no mínimo 6 caracteres" })
});

export type LoginData = z.infer<typeof loginSchema>;