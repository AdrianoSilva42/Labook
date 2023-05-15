import express, { Request, Response} from 'express';
import cors from 'cors';
import { UserDBPost } from './types';
import { db } from './database/BaseDatabase';


const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//singup
app.post("/users", async(req:Request, res:Response) => {
    try{
        const {id, name, email, password, role}: UserDBPost = req.body

        const user = await db.select("*").from("users")

        if(!id && !name && !email && !password && !role){
            throw new Error("É necessario preenher todos os campos")    
        };

        if(id !== undefined){
            const idDB = user.map(id => {return id.id})
            if(id.length < 3){
                throw new Error("O 'id' do novo usuario deve conter 3 digitos e ser diferente do que já existe.")
            }
        
            if(idDB.includes(id)){
                throw new Error("Já existe uma conta com esse 'id'. Tente novamente com outro.")
            }
        };


        if(email !== undefined){
            const emailDB = user.map(email => {return email.email})
            if(!email.includes('@email.com')){
                throw new Error("O email deve conter o trecho '@email.com'.")
            }

            if(emailDB.includes(email)){
                throw new Error("Esse email já existe. Tente outro.")
            }
        };


        if(password != undefined){
            if(password.length < 6){
                throw new Error("A senha deve conter 6 digitos ou mais.")
            }
        };


        if(role !== undefined){
            if(role !== "NORMAL" && role !== "ADMIN"){
                throw new Error("O valor de 'role' precisa ser um 'NORMAL' ou 'ADMIN'.")
            }
        };

        const newUser = {
            id: id,
            name: name,
            email: email,
            password: password,
            role: role
        }

        await db("users").insert(newUser)

        res.status(201).send("Novo usuario cadastrado com sucesso!")

    }catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof error) {
            res.status(error.statusCode).send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

});

//login
app.get("/users/:id", async(req:Request, res:Response) => {
    try{

        const id = req.params.id

        const [result] = await db.select("*").from("users").where("id", "=", id)

        if(!result){
            res.status(400)
            throw new Error("Esse usuario não existe. Tente novamente com um 'id' valido")
        };

        res.status(200).send(result)
    }catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.status(400).send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

});

//create post
app.post("/posts", async(req:Request, res:Response) => {
    try{

       const {id, creatorId, content} = req.body

       if(!id && !creatorId && !content){
          throw new Error("É necessario preencher todos os campos")
       }
       const posts = await db.select("*").from("post")

       if(id !== undefined){
            const ids = posts.map(id => {return id.id})

            if(id.length < 3){
                throw new Error("O 'id' do novo usuario deve conter 3 digitos e ser diferente do que já existe.")
            }
        
        if(ids.includes(id)){
            throw new Error("Já existe uma conta com esse 'id'. Tente novamente com outro.")
        }
       };

       if(creatorId !== undefined){
            const user = await db.select("*").from("users")
            const idDB = user.map(id => {return id.id})

            if(!idDB.includes(creatorId)){
                throw new Error("Digite um 'id' existente para o 'creatorId'.")
            }
       };

       if(content !== undefined){
        if(content.length < 1){
            throw new Error("A postagem precisa conter alguma coisa para ser publicada.")
        }
       };

       const newPost = {
        id: id,
        creator_id: creatorId,
        content: content
       }

       await db("post").insert(newPost)

       res.status(201).send('Conteudo postado com sucesso!')

    }catch(error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof error) {
            res.status(error.statusCode).send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//get post
app.get("/posts/:id", async(req:Request, res:Response) => {
    try{
        const id = req.params.id

        const [result] = await db.select("*").from("post").where("id", "=", id)

        if(!result){
            throw new Error("Esse post não foi encontrado.")
        }

        res.status(200).send(result)

    }catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.status(400).send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});