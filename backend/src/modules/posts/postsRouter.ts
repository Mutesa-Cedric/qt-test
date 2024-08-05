import { Router } from "express";
import PostsController from "./postsController";
import isAuthenticated from "../../middlewares/auth";

const router = Router();

router.post("/", isAuthenticated, PostsController.createPost);
router.get("/", PostsController.getPosts);
router.get("/:id", PostsController.getPostById);
router.put("/:id", isAuthenticated, PostsController.updatePost);
router.delete("/:id", isAuthenticated, PostsController.deletePost);
router.post("/:id/comments", isAuthenticated, PostsController.addComment);

const postsRouter = router;
export default postsRouter;