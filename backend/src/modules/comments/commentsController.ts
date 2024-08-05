import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CommentsController {
    /**
     * @swagger
     * /comments:
     *  post:
     *    description: Create a new comment
     *    parameters:
     *      - in: body
     *        name: comment
     *        description: The comment to create.
     *        schema:
     *          type: object
     *          required:
     *            - content
     *            - postId
     *        properties:
     *          content:
     *            type: string
     *          postId:
     *            type: integer
     *    responses:
     *      201:
     *        description: Comment created successfully
     *      500:
     *        description: Internal Server Error
     */
    public static async createComment(req: Request, res: Response) {
        try {
            const { content, postId } = req.body;
            const comment = await prisma.comment.create({
                data: {
                    content,
                    postId: parseInt(postId),
                    // @ts-ignore
                    authorId: parseInt(req.user)
                }
            });
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    /**
     * @swagger
     * /comments/{id}:
     *  get:
     *    description: Get a comment by id
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *    responses:
     *      200:
     *        description: Get a comment by id
     *      404:
     *        description: Comment not found
     *      500:
     *        description: Internal Server Error
     */
    public static async getCommentById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const comment = await prisma.comment.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    /**
     * @swagger
     * /comments/{id}:
     *  put:
     *    description: Update a comment by id
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *      - in: body
     *        name: comment
     *        description: The comment to update.
     *        schema:
     *          type: object
     *          required:
     *            - content
     *        properties:
     *          content:
     *            type: string
     *    responses:
     *      200:
     *        description: Comment updated successfully
     *      404:
     *        description: Comment not found
     *      500:
     *        description: Internal Server Error
     */
    public static async updateComment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const comment = await prisma.comment.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    content
                }
            });
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    /**
     * @swagger
     * /comments/{id}:
     *  delete:
     *    description: Delete a comment by id
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *    responses:
     *      200:
     *        description: Comment deleted successfully
     *      404:
     *        description: Comment not found
     *      500:
     *        description: Internal Server Error
     */
    public static async deleteComment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await prisma.comment.delete({
                where: {
                    id: parseInt(id)
                }
            });
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}