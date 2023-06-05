import { PostBusiness } from './../business/PostBusiness';
import { Request, Response } from "express"
import { BaseError } from '../errors/BaseError';
import { CreatedPostSchema } from '../dtos/postagem/createPost.dto';
import { EditPostSchema } from '../dtos/postagem/editarPost.dto';
import { ZodError } from 'zod';
import { BuscarPostsSchema } from '../dtos/postagem/buscarPosts.dto';
import { IdGenerator } from '../services/IdGenerator';
import { DeletPostSchema } from '../dtos/postagem/deletarPost.dto';
import { LikeOrDislikePostSchema } from '../dtos/postagem/likeOrDislikePost.dto';


export class PostController{
    constructor(
        private postBusiness: PostBusiness,
        private idGenerator: IdGenerator
    ){}

    public criarPost = async(req:Request, res:Response) => {
        try{
        
            const input = CreatedPostSchema.parse({
                content: req.body.content,
                token: req.headers.authorization
            })

           const output = await this.postBusiness.criarPost(input)
          
    
           res.status(201).send(output)
    
        }catch(error) {
            console.log(error)
    
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    };

    public buscarPosts = async(req:Request, res:Response) => {
        try{

            const input = BuscarPostsSchema.parse({
                token: req.headers.authorization
            })

             
            const output = await this.postBusiness.buscarPosts(input)
    
            res.status(200).send(output)
    
        }catch (error) {
            console.log(error)
    
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    };

    public editarPost = async(req:Request, res:Response) => {
        try{
           
            const input = EditPostSchema.parse({
                token: req.headers.authorization,
                idToEdit: req.params.id,
                newContent: req.body.content
            })
    
            const output = await this.postBusiness.editarPost(input)  
          
    
            res.status(200).send(output)
    
        }catch (error) {
            console.log(error)
    
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    };

    public deletarPost = async(req:Request, res:Response) => {
        try{
            const input = DeletPostSchema.parse({
                token: req.headers.authorization,
                idToDelet: req.params.id
            })
            
    
           await this.postBusiness.deletarPost(input)
           
            res.status(200).send("Post excluido com sucesso.")
    
        }catch (error) {
            console.log(error)
    
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    };

    public likeOrDislikePost = async(req:Request, res:Response) => {
        try{
            const input = LikeOrDislikePostSchema.parse({
               token: req.headers.authorization,
               postId: req.params.id,
               like: req.body.like

            })
            
    
           const output = await this.postBusiness.likeOrDislikePost(input)
           
            res.status(200).send(output)
    
        }catch (error) {
            console.log(error)
    
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


}