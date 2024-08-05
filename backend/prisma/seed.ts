import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create users
    const users = await Promise.all([
        prisma.user.create({
            data: {
                email: 'user1@example.com',
                password: 'password1',
                name: 'User One'
            }
        }),
        prisma.user.create({
            data: {
                email: 'user2@example.com',
                password: 'password2',
                name: 'User Two'
            }
        }),
        prisma.user.create({
            data: {
                email: 'user3@example.com',
                password: 'password3',
                name: 'User Three'
            }
        })
    ]);

    // Create posts
    const posts = await Promise.all(
        Array.from({ length: 10 }).map((_, i) =>
            prisma.post.create({
                data: {
                    title: `Post ${i + 1}`,
                    content: `Content for post ${i + 1}`,
                    authorId: users[i % users.length].id
                }
            })
        )
    );

    // Create comments
    await Promise.all(
        Array.from({ length: 30 }).map((_, i) =>
            prisma.comment.create({
                data: {
                    content: `Comment ${i + 1}`,
                    postId: posts[i % posts.length].id,
                    authorId: users[i % users.length].id
                }
            })
        )
    );
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });