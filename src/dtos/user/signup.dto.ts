import {z} from 'zod'

export interface CreatedUserInputDTO{
    name: string, 
    email: string, 
    password: string, 
    role: string
}

export interface CreatedUserOutputDTO{
    message: string,
    token: string
}

export const createdUserSchema = z.object({
    name: z.string().min(2), 
    email: z.string().email(), 
    password: z.string().min(6)
}).transform(data => data as CreatedUserInputDTO)