import { Router } from "express";
import PostsController from "./postsController";

const router = Router();

router.post("/posts", PostsController.createPost);
router.get("/posts", PostsController.getPosts);
router.put("/posts/:id", PostsController.updatePost);
router.delete("/posts/id", PostsController.deletePost);

const postsRouter = router;
export default postsRouter;