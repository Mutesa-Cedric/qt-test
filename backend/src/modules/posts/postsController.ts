import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class PostsController {
    /**
     * @swagger
     * /posts:
     *  post:
     *    description: Create a new post
     *    parameters:
     *      - in: body
     *        name: post
     *        description: The post to create.
     *        schema:
     *          type: object
     *          required:
     *            - title
     *            - content
     *          properties:
     *            title:
     *              type: string
     *            content:
     *              type: string
     *    responses:
     *      201:
     *        description: Post created successfully
     *      500:
     *        description: Internal Server Error
     */
    public static async createPost(req: Request, res: Response) {
        try {
            const { title, content } = req.body;
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    // @ts-ignore
                    authorId: parseInt(req.user)
                }
            });
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    /**
     * @swagger
     * /posts:
     *  get:
     *    description: Get all posts
     *    responses:
     *      200:
     *        description: Get all posts
     *      500:
     *        description: Internal Server Error
     */
    public static async getPosts(req: Request, res: Response) {
        try {
            const posts = await prisma.post.findMany({
                include: {
                    author: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });
            res.status(200).json({
                posts
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    /**
     * @swagger
     * /posts/{id}:
     *  get:
     *    description: Get a post by id
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *    responses:
     *      200:
     *        description: Get a post by id
     *      404:
     *        description: Post not found
     *      500:
     *        description: Internal Server Error
     */
    public static async getPostById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const post = await prisma.post.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
            const comments = await prisma.comment.findMany({
                where: {
                    postId: parseInt(id)
                }
            });
            res.status(200).json({ post, comments });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    /**
     * @swagger
     * /posts/{id}:
     *  put:
     *    description: Update a post by id
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *      - in: body
     *        name: post
     *        description: The post to update.
     *        schema:
     *          type: object
     *          required:
     *            - title
     *            - content
     *          properties:
     *            title:
     *              type: string
     *            content:
     *              type: string
     *    responses:
     *      200:
     *        description: Post updated successfully
     *      404:
     *        description: Post not found
     *      500:
     *        description: Internal Server Error
     */
    public static async updatePost(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const post = await prisma.post.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title,
                    content
                }
            });
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    /**
     * @swagger
     * /posts/{id}:
     *  delete:
     *    description: Delete a post by id
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *    responses:
     *      200:
     *        description: Post deleted successfully
     *      404:
     *        description: Post not found
     *      500:
     *        description: Internal Server Error
     */
    public static async deletePost(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const post = await prisma.post.delete({
                where: {
                    id: parseInt(id)
                }
            });
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}