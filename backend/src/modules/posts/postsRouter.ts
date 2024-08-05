import { Router } from "express";
import PostsController from "./postsController";
import isAuthenticated from "../../middlewares/auth";

const router = Router();

router.post("/posts", isAuthenticated, PostsController.createPost);
router.get("/posts", PostsController.getPosts);
router.get("/posts/:id", PostsController.getPostById);
router.put("/posts/:id", isAuthenticated, PostsController.updatePost);
router.delete("/posts/id", isAuthenticated, PostsController.deletePost);

const postsRouter = router;
export default postsRouter;