import { LikeDislikeDB, POST_LIKE, PostDBWithCreatorName } from "../models/Post";
import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";


export class PostDatabase extends BaseDatabase{

    public static TABLE_POST = "post"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public async procurarPostsWithCreatorName(): Promise<PostDBWithCreatorName[]> | undefined{

        const postDB = await PostDatabase.conection(PostDatabase.TABLE_POST)
        .select(
            `${PostDatabase.TABLE_POST}.id`,
            `${PostDatabase.TABLE_POST}.creator_id`,
            `${PostDatabase.TABLE_POST}.content`,
            `${PostDatabase.TABLE_POST}.likes`,
            `${PostDatabase.TABLE_POST}.dislikes`,
            `${PostDatabase.TABLE_POST}.created_at`,
            `${PostDatabase.TABLE_POST}.update_at`,
            `${UserDatabase.TABLE_USER}.name as creator_name`
        )
        .join(`${UserDatabase.TABLE_USER}`, 
              `${PostDatabase.TABLE_POST}.creator_id`, 
              "=", 
              `${UserDatabase.TABLE_USER}.id`)

        return postDB as PostDBWithCreatorName[]

    };

    public async inserirPost(newPostDB: PostDB): Promise<void>{

        await PostDatabase.conection(PostDatabase.TABLE_POST).insert(newPostDB)

    };

    public async procurarPost(): Promise<PostDB | undefined>{

        const [result]: PostDB[] | undefined = await PostDatabase.conection.select("*").from(PostDatabase.TABLE_POST)

        return result 

    };

    public async procurarPostPorId(id: string | undefined): Promise<PostDB | undefined>{

        const [result]: PostDB[] | undefined = await PostDatabase.conection.select("*").from(PostDatabase.TABLE_POST).where({id}) 

        return result 

    };

    public async updateDePost(newContent: {}, id: string): Promise<void>{

        await PostDatabase.conection(PostDatabase.TABLE_POST).update(newContent).where({id})

    };

    public async deletarPost(id: string): Promise<void>{

        await PostDatabase.conection(PostDatabase.TABLE_POST).delete().where({id})

    };

    public async procurarPostWithCreatorDBByid(id: string): Promise<PostDBWithCreatorName | undefined> {

        const [postDB] = await PostDatabase.conection(PostDatabase.TABLE_POST)
        .select(
            `${PostDatabase.TABLE_POST}.id`,
            `${PostDatabase.TABLE_POST}.creator_id`,
            `${PostDatabase.TABLE_POST}.content`,
            `${PostDatabase.TABLE_POST}.likes`,
            `${PostDatabase.TABLE_POST}.dislikes`,
            `${PostDatabase.TABLE_POST}.created_at`,
            `${PostDatabase.TABLE_POST}.update_at`,
            `${UserDatabase.TABLE_USER}.name as creator_name`
        )
        .join(
            `${UserDatabase.TABLE_USER}`, 
            `${PostDatabase.TABLE_POST}.creator_id`, 
            "=", 
            `${UserDatabase.TABLE_USER}.id`
        )
        .where({[`${PostDatabase.TABLE_POST}.id`]: id})

        return postDB as PostDBWithCreatorName | undefined

    };

    public async findLikeDislike(likeDislikeDB: LikeDislikeDB): Promise<POST_LIKE | undefined> {
        const [result] = await BaseDatabase
                            .conection(PostDatabase.TABLE_LIKES_DISLIKES)
                            .select()
                            .where({user_id: likeDislikeDB.user_id,
                                    post_id: likeDislikeDB.post_id})
          
        if(result === undefined){
            return undefined

        } else if(result.like === 1){
            return POST_LIKE.ALREADY_LIKED
            
        }else{
            return POST_LIKE.ALREADY_DISLIKED
        }

        //return result as POST_LIKE | undefined
    };

    public async removerLikeDislike(likeDislikeDB: LikeDislikeDB): Promise<void>{
        await BaseDatabase.conection(PostDatabase.TABLE_LIKES_DISLIKES)
                          .delete()
                          .where({user_id: likeDislikeDB.user_id,
                            post_id: likeDislikeDB.post_id})
    };

    public async updateLikeDislike(likeDislikeDB: LikeDislikeDB): Promise<void>{
        await BaseDatabase.conection(PostDatabase.TABLE_LIKES_DISLIKES)
        .update(likeDislikeDB)
        .where({user_id: likeDislikeDB.user_id,
          post_id: likeDislikeDB.post_id})
    };

    public async insertLikeDislike(likeDislikeDB: LikeDislikeDB): Promise<void>{
        await BaseDatabase.conection(PostDatabase.TABLE_LIKES_DISLIKES)
        .insert(likeDislikeDB)
    };
}