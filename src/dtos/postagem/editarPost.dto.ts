import z from "zod"

export interface EditPostInputDTO{
    token: string,
    idToEdit: string,
    newContent: string
}

export interface EditPostOutputDTO{
    output: string
}

export const EditPostSchema = z.object({
    token: z.string().min(1),
    idToEdit: z.string(),
    newContent: z.string().min(1)
}).transform(data => data as EditPostInputDTO)