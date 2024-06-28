import z from "zod";

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

export const createCandidate = z.object({
    name: z.string(),
    skills: z.string(),
    location: z.string(),
    experience: z.string(),
    username: z.string().email(),
    title: z.string(),
    status: z.string()
});

export const updateCandidate = z.object({
    name: z.string(),
    skills: z.string(),
    location: z.string(),
    experience: z.string(),
    username: z.string().email(),
    title: z.string(),
    status: z.string()
});

export type CreateCandidate = z.infer<typeof createCandidate>
export type SigninInput = z.infer<typeof signinInput>
export type SignupInput = z.infer<typeof signupInput>
export type UpdateCandidate = z.infer<typeof updateCandidate>

