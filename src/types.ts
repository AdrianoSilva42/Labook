import { USER_ROLES } from "./models/User"

export interface UserClass{
    id: string,
    name: string,
    email: string, 
    password: string, 
    role: string
}

export interface UserDB{
    id: string,
    name: string,
    email: string, 
    password: string, 
    role: USER_ROLES,
    created_at: string
}

export interface CreatedPost{
    id: string | undefined,
    creatorId: string | undefined,
    content: string | undefined
}

export interface PostDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    update_at: string
}