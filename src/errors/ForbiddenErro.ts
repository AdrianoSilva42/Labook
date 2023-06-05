import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError{
    constructor(
        message: string = "Toekn válido, mas sem permissões suficientes"
    ){
        super(403, message)
    }
}