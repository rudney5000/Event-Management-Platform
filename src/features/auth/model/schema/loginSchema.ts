import { z } from "zod"

export const loginSchemaDto = z.object({
    id: z.string(),
    email: z.string().email({ message: "please enter a valid number"}),
    password: z.string().min(6)
})

export const loginSchema = z.object({
    email: z.string().email({ message: "please enter a valid number"}),
    password: z.string().min(6)
})

export const loginResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    user: z.object({
        id: z.string(),
        email: z.string().email(),
        name: z.string().optional(),
        roles: z.array(z.string()).optional(),
    }),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type LoginFormData = z.infer<typeof loginSchema>
export type LoginDtoFormData = z.infer<typeof loginSchemaDto>