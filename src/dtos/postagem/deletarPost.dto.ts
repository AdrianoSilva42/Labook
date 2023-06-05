import z from 'zod'

export interface DeletPostInputDTO{
    token: string,
    idToDelet: string
}

export type DeletPostOutputDTO = undefined

export const DeletPostSchema = z.object({
    token: z.string().min(1),
    idToDelet: z.string().min(1)
}).transform(data => data as DeletPostInputDTO)