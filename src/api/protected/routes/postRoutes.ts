import {Router} from "express";
import postController from "../controllers/postController";


const postRoutes: Router = Router();

postRoutes.post('/create', postController.createPost);
postRoutes.get('/all/:channelId', postController.getPosts);
postRoutes.put('/update', postController.updatePost);
postRoutes.delete('/delete/:postId', postController.deletePost);
postRoutes.post('/add-comment', postController.addComment)
postRoutes.put('/update-comment', postController.updateComment)
postRoutes.delete('/delete-comment/:commentId', postController.deleteComment)
postRoutes.get('/comments/:postId', postController.getComments)

export default postRoutes;
