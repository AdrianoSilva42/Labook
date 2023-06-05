import { UserDB } from './../types';
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase{

    public static TABLE_USER = "users"

    public async procurarUsuarioPorEmail(email: string | undefined): Promise<UserDB | undefined>{

        const [result]: UserDB[] | undefined = await UserDatabase.conection.select("*").from(UserDatabase.TABLE_USER).where("email", "=", email)

        return result
    };

    public async procurarUsuarioPorId(id: string | undefined): Promise<UserDB | undefined>{

        const [result]: UserDB[] | undefined = await UserDatabase.conection.select("*").from(UserDatabase.TABLE_USER).where("id", "=", id)

        return result
    };

    public async procurarUsuarios(): Promise<UserDB[] | undefined>{

        const result: UserDB[] | undefined = await UserDatabase.conection.select("*").from(UserDatabase.TABLE_USER)
        
        return result

    };

    public async inserirUsuario(newUserDB: UserDB): Promise<void>{

        await UserDatabase.conection(UserDatabase.TABLE_USER).insert(newUserDB)

    };

}