import  express  from "express";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    ),
    new IdGenerator()
)

//create post
postRouter.post("/", postController.criarPost)

//get post
postRouter.get("/", postController.buscarPosts)

//edit post
postRouter.put("/:id", postController.editarPost)

//delete post
postRouter.delete("/:id", postController.deletarPost)


postRouter.put("/:id/like", postController.likeOrDislikePost)

//http://localhost:3003/posts