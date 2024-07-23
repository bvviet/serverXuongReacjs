import { Router } from "express";
import CommentController from "../controllers/comment.js";
const commentRouter = Router();

commentRouter.get("/:productId", CommentController.getComment);
commentRouter.post("/", CommentController.addComment);
commentRouter.put("/:commentId", CommentController.updateComment);
commentRouter.delete("/:commentId", CommentController.deleteComment);

export default commentRouter;
