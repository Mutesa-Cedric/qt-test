

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    comments: Comment[];
    createdAt: string;
}

export interface Comment {
    id: number;
    content: string;
    author: User;
    createdAt: string;
}