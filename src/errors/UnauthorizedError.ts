import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError{
    constructor(
        message: string = "Token Invalido"
    ){
        super(401, message)
    }
}