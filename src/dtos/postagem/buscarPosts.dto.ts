import z from 'zod'
import { PostModel } from "../../models/Post";

export interface BuscarPostsInputDTO{
    token: string
}

export type BuscarPostsOutputDTO = PostModel[]


export const BuscarPostsSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as BuscarPostsInputDTO)