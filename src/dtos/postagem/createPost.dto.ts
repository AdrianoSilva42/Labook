import z from 'zod'

export interface CreatedPostInputDTO{
    content?: string,
    token: string
}

export interface CreatedPostOutputDTO{
        content: string
}

export const CreatedPostSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as CreatedPostInputDTO)