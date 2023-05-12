export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
    name: string,
    role: USER_ROLES
}

//recebendo dados do body para criar um novo Usuario
export interface UserDBPost{
    id: string,
    name: string,
    email: string, 
    password: string, 
    role: string
}

export interface UserDBGet{
    id: string,
    name: string,
    email: string, 
    password: string, 
    role: string
}