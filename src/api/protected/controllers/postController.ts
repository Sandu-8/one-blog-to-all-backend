import { Request, Response } from 'express';
import createPostValidator from "../../../utils/validators/createPostValidator";
import {ValidationError} from "yup";
import Channel from "../../../db/models/channel";
import Post from "../../../db/models/post";
import updatePostValidator from "../../../utils/validators/updatePostValidator";
import createCommentValidator from "../../../utils/validators/createCommentValidator";
import User from "../../../db/models/user";
import Comment from "../../../db/models/comment";
import comment from "../../../db/models/comment";
import updateCommentValidator from "../../../utils/validators/updateCommentValidator";

const PostController = {
    createPost: (req: Request, res: Response) => {
        const postData = req.body.post || {};

        createPostValidator.validate(postData, {abortEarly: false}).then(async () => {
           const channel = await Channel.findOne({where: {id: postData.channelId}});

           if (!channel) {
                res.status(404);
                return res.send({
                     message: "Channel not found",
                });
           }

              const post = await Post.create({
                 ...postData,
              });

           if (!post) {
               res.status(500);
               return res.send({
                   message: "Server error, post was not created!",
               });
           }

           res.status(200);
           return res.send({
              message: "Post created successfully",
              success: true,
           });
        }).catch((validationErrors) => {
            const errors: Record<string, string> = {};

            validationErrors.inner.forEach((error: ValidationError) => {
                if (error.path) {
                    errors[error.path] = error.message;
                }
            });

            res.status(400);
            return res.send(errors);
        });
    },
    getPosts: async (req: Request, res: Response) => {
        const channelId = req.params.channelId;

        const posts = await Post.findAll({where: {channelId: channelId}});

        if (posts.length === 0) {
            res.status(404);

            return res.send({
                message: "Channel does not have any posts!",
                success: false,
            });
        }

        res.status(200);
        return res.send({
            posts: posts,
            success: true,
        });
    },
    updatePost: async (req: Request, res: Response) => {
        const postData = req.body.post || {};
        const postId = parseInt(req.body.postId) || 0;

        if (!postId) {
            res.status(400);

            return res.send({
                message: "postId is required",
                success: false,
            });
        }

        const post = await Post.findByPk(postId);

        if (!post) {
            res.status(404);

            return res.send({
                message: "Post does not exists",
                success: false,
            });
        }

        updatePostValidator.validate(postData, {abortEarly: false}).then(async () => {
            const updatedPost = await Post.update({
                ...postData,
            }, {
                where: {
                    id: postId,
                }
            });

            if (!updatedPost[0]) {
                res.send(500);

                return res.send({
                    message: "Server error, post was not updated!",
                    success: false,
                });
            }

            res.status(200);

            return res.send({
               message: "Post updated successfully",
               success: true,
            });
        }).catch((validationErrors) => {
            const errors: Record<string, string> = {};

            validationErrors.inner.forEach((error: ValidationError) => {
                if (error.path) {
                    errors[error.path] = error.message;
                }
            });

            res.status(400);
            return res.send(errors);
        });

    },
    deletePost: async (req: Request, res: Response) => {
        const postId = parseInt(req.params.postId) || 0;

        if (!postId) {
            res.status(400);

            return res.send({
                message: "postId is required",
                success: false,
            });
        }

        const post = await Post.findByPk(postId);

        if (!post) {
            res.status(404);

            return res.send({
                message: "Post does not exists",
                success: false,
            });
        }

        const postDeletedCount = await Post.destroy({where: {id: postId}});

        if (postDeletedCount === 0) {
            res.status(500);

            return res.send({
                message: "Server error, post was not deleted!",
                success: false,
            });
        }

        res.status(200);

        return res.send({
           message: "Post deleted successfully",
           success: true,
        });
    },
    addComment: async (req: Request, res: Response) => {
        const comment = req.body.comment || {};
        const userExists = await User.findByPk(comment.userId);
        const postExists = await Post.findByPk(comment.postId);

        if (!userExists || !postExists) {
            res.status(404);
            return res.send({
                message: "User or post does not exists",
            });
        }

        createCommentValidator.validate(comment, {abortEarly: false}).then(async () => {
            const newComment = await Comment.create({
                ...comment,
            });

            if (!newComment) {
                res.status(500);
                return res.send({
                    message: "Server error, comment was not created!",
                });
            }

            res.status(200);

            return res.send({
                message: "Comment created successfully",
                success: true,
            });
        }).catch((validationErrors) => {
            const errors: Record<string, string> = {};

            if (!validationErrors.inner) {
                return res.send({
                   message: "Server error",
                   success: false,
                    error: validationErrors
                });
            }
            validationErrors.inner.forEach((error: ValidationError) => {
                if (error.path) {
                    errors[error.path] = error.message;
                }
            });

            res.status(400);
            return res.send(errors);
        });
    },
    updateComment: async (req: Request, res: Response) => {
        const updatedComment = req.body.updatedComment ||  {};

        const commentExists = await Comment.findByPk(updatedComment.commentId);

        if (!commentExists) {
            res.status(404);

            return res.send({
               message: "Comment does not exists",
               success: false,
            });
        }

        updateCommentValidator.validate(updatedComment, {abortEarly: false}).then(async () => {
            const comment = await Comment.update({
                comment: updatedComment.comment,
            }, {
                where: {
                    id: updatedComment.commentId,
                }
            });

            if (!comment[0]) {
                res.status(500);

                return res.send({
                    message: "Server error, comment was not updated!",
                    success: false,
                });
            }

            res.status(200);

            return res.send({
                message: "Comment updated successfully",
                success: true,
            });
        }).catch((validationErrors) => {
            const errors: Record<string, string> = {};

            validationErrors.inner.forEach((error: ValidationError) => {
                if (error.path) {
                    errors[error.path] = error.message;
                }
            });

            res.status(400);
            return res.send(errors);
        });

    },
    deleteComment: async (req: Request, res: Response) => {
        const commentId = parseInt(req.params.commentId) || 0;

        if (!commentId) {
            res.status(400);

            return res.send({
                message: "commentId is required",
                success: false,
            });
        }

        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            res.status(404);

            return res.send({
                message: "Comment does not exists",
                success: false,
            });
        }

        const commentDeletedCount = await Comment.destroy({where: {id: commentId}});

        if (commentDeletedCount === 0) {
            res.status(500);

            return res.send({
                message: "Server error, comment was not deleted!",
                success: false,
            });
        }

        res.status(200);

        return res.send({
            message: "Comment deleted successfully",
            success: true,
        });
    },
    getComments: async (req: Request, res: Response) => {
        const postId = parseInt(req.params.postId) || 0;

        const post = await Post.findByPk(postId);

        if (!post) {
            res.status(404);

            return res.send({
                message: "Post does not exists",
                success: false,
            });
        }

        const comments = await Comment.findAll({where: {postId: postId}});

        res.status(200);

        return res.send({
            comments: comments,
            success: true,
        });
    }
};

export default PostController;
