import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email({ message: "please enter a valid number"}),
    password: z.string().min(6)
})

export type LoginFormData = z.infer<typeof loginSchema>