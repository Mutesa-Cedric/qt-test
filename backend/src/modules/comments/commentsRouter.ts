import { Router } from 'express';
import CommentsController from './commentsController';

const router = Router();

router.post('/comments', CommentsController.createComment);
router.get('/comments/:id', CommentsController.getCommentById);
router.put('/comments/:id', CommentsController.updateComment);
router.delete('/comments/:id', CommentsController.deleteComment);

const commentsRouter = router;
export default commentsRouter;