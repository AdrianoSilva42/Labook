import { PostDatabase } from "../database/PostDatabase";
import { BuscarPostsInputDTO, BuscarPostsOutputDTO } from "../dtos/postagem/buscarPosts.dto";
import { CreatedPostInputDTO, CreatedPostOutputDTO } from "../dtos/postagem/createPost.dto";
import { DeletPostInputDTO, DeletPostOutputDTO } from "../dtos/postagem/deletarPost.dto";
import { EditPostInputDTO } from "../dtos/postagem/editarPost.dto";
import { LikeOrDislikePostInputDTO, LikeOrDislikePostOutputDTO } from "../dtos/postagem/likeOrDislikePost.dto";
import { ForbiddenError } from "../errors/ForbiddenErro";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { LikeDislikeDB, POST_LIKE, Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";
import {  PostDB } from "../types";


export class PostBusiness{
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}

    public criarPost = async(input: CreatedPostInputDTO): Promise<CreatedPostOutputDTO> => {
        const {  content, token} = input

        
        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new UnauthorizedError()
        }

         const id = this.idGenerator.generator() 
         //const posts = await this.postDatabase.procurarPost()
  
         const creator_id = payload.id

         const newPost: Post = new Post(
              id,
              creator_id,
              content,
              0,
              0,
              new Date().toISOString(),
              "",
              ""
         )
  
         const newPostDB: PostDB = {
          id: newPost.getId(),
          creator_id: newPost.getCreatorId(),
          content: newPost.getContent(),
          likes: newPost.getLikes(),
          dislikes: newPost.getDislikes(),
          created_at: newPost.getCreatedAt(),
          update_at: newPost.getUpdateAt()
         }
        
         await this.postDatabase.inserirPost(newPostDB)

         const output: CreatedPostOutputDTO = {
                content: newPostDB.content
         }

         return output
    };

    public buscarPosts = async(input: BuscarPostsInputDTO): Promise<BuscarPostsOutputDTO> =>{

        const {token} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload){
            throw new UnauthorizedError()
        }
            
        const postsDBWithCreatorName = await this.postDatabase.procurarPostsWithCreatorName()
    
        const posts = postsDBWithCreatorName.map((postWithCreatorName) => {
            const posts = new Post(
                postWithCreatorName.id,
                postWithCreatorName.creator_id,
                postWithCreatorName.content,
                postWithCreatorName.likes,
                postWithCreatorName.dislikes,
                postWithCreatorName.created_at,
                postWithCreatorName.update_at,
                postWithCreatorName.creator_name
                )

                return posts.toBusinessModel()
            })

       const output: BuscarPostsOutputDTO = posts

       return output
    };

    public editarPost = async(input: EditPostInputDTO): Promise<string> => {
        const {token, idToEdit, newContent} = input


        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new UnauthorizedError()
        }

        const post = await this.postDatabase.procurarPostPorId(idToEdit)
        if(!post){
            throw new NotFoundError("post com esse id não existe")
        }

        if(payload.id !== post.creator_id){
            throw new ForbiddenError("Apenas o criador do post pode editar o conteudo")
        }
       
    
        const updatePost: Post = new Post(
             post.id,
             post.creator_id,
             post.content,
             post.likes,
             post.dislikes,
             post.created_at,
             new Date().toISOString(),
             ""
        )

        updatePost.setContent(newContent),
        updatePost.setUpdateAt(new Date().toISOString()) 

            const updatePostDB = {
                content: updatePost.getContent(),
                update_at: updatePost.getUpdateAt()
            }

        await this.postDatabase.updateDePost(updatePostDB, idToEdit)

        const output: string = updatePostDB.content

        return output
    };

    public deletarPost = async(input: DeletPostInputDTO): Promise<DeletPostOutputDTO> => {
        const {token, idToDelet} = input

        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new UnauthorizedError()
        }

        const post = await this.postDatabase.procurarPostPorId(idToDelet)

        if(!post){
            throw new NotFoundError("Esse 'id' não existe. Digite um id valido.")
        };

        if(payload.role !== USER_ROLES.ADMIN){
            if(payload.id !== post.creator_id){
                throw new ForbiddenError("Apenas o criador do post pode deletar o post")
            }
        }

        await this.postDatabase.deletarPost(idToDelet)

        const output: DeletPostOutputDTO = undefined

        return output
    };

    public likeOrDislikePost = async(input: LikeOrDislikePostInputDTO): Promise<LikeOrDislikePostOutputDTO> => {
        const {token, postId, like} = input

        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new UnauthorizedError()
        }

        const postDBWithCreatorName = await this.postDatabase.procurarPostWithCreatorDBByid(postId)

        console.log(postDBWithCreatorName)

        if(!postDBWithCreatorName){
            throw new NotFoundError("Post com esse id não existe")
        }

        const post = new Post(
            postDBWithCreatorName.id,
            postDBWithCreatorName.creator_id,
            postDBWithCreatorName.content,
            postDBWithCreatorName.likes,
            postDBWithCreatorName.dislikes,
            postDBWithCreatorName.created_at,
            postDBWithCreatorName.update_at,
            postDBWithCreatorName.creator_name
        )

        const likeSQlite = like ? 1 : 0
        const likeDislikeDB: LikeDislikeDB = {
            user_id: payload.id,
            post_id: postId,
            like: likeSQlite
        }

        const likeDislikeExist = await this.postDatabase.findLikeDislike( likeDislikeDB)

        if(likeDislikeExist === POST_LIKE.ALREADY_LIKED){

            if(like){
                await this.postDatabase.removerLikeDislike(likeDislikeDB)
                post.removeLike()
            }else{
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeLike()
                post.addDislike()
            }
        } else if(likeDislikeExist === POST_LIKE.ALREADY_DISLIKED){
            if(like === false){
                await this.postDatabase.removerLikeDislike(likeDislikeDB)
                post.removeDislike()
            } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeDislike()
                post.addLike()
            }
        } else {
            await this.postDatabase.insertLikeDislike(likeDislikeDB)
            like ? post.addLike() : post.addDislike()
        }

        const updatePostDB = post.toBusinessModelLikeDislike()
        await this.postDatabase.updateDePost(updatePostDB, postId)

        const output: LikeOrDislikePostOutputDTO = undefined

        return output
    };
}