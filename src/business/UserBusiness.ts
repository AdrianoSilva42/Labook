import { UserDatabase } from "../database/UserDatabase";
import { LoginOutputDTO } from "../dtos/user/login.dto";
import { CreatedUserInputDTO, CreatedUserOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User, USER_ROLES } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { UserDB } from "../types";


export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}

    public signup = async(input: CreatedUserInputDTO): Promise<CreatedUserOutputDTO> => {
        const{ name, email, password} = input
         
        const id = this.idGenerator.generator()

        const hashePassword = await this.hashManager.hash(password)
       
        const userExist = await this.userDatabase.procurarUsuarioPorId(id)
        if(userExist){
            throw new BadRequestError("'id' já existe.")
        }

        const emailExist = await this.userDatabase.procurarUsuarioPorEmail(email)
        if(emailExist){
            throw new BadRequestError("'email' já existe.")
        }
     
        const newUser: User = new User (
            id,
            name,
            email,
            hashePassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )
         
        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt()
        }

        await this.userDatabase.inserirUsuario(newUserDB)

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output = {
            message: "Usuario cadastrado com sucesso",
            token: token
        }

        return output
    };

    public login = async(input: any): Promise<LoginOutputDTO> => {
            const {email, password} = input

            const userDB = await this.userDatabase.procurarUsuarioPorEmail(email)

            if(!userDB){
                throw new NotFoundError("O 'email' fornecido não foi encontrado")
            }

            const hashePassword = userDB.password

            const isPasswordCorrect = await this.hashManager.compare(password, hashePassword)

            if(!isPasswordCorrect){
                throw new NotFoundError("O 'email' ou o 'password' estão incorretos.")
            };

            const tokenPayload: TokenPayload = {
                id: userDB.id,
                name: userDB.name,
                role: userDB.role
            }

            const token = this.tokenManager.createToken(tokenPayload)
    
            const output = {
                message: "Login realizado com sucesso",
                token: token
            }

        return output
    };
}