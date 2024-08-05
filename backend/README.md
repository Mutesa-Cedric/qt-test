# Backend

This is the backend of the project. It's built with Node.js and Express.

## Tools and Technologies Used

- Node.js
- Express
- Prisma
- Zod
- JWT
- Bcrypt
- Swagger

## How to Run

1. Install dependencies with `npm install`.
2. Run the development server with `npm run dev`.
3. Backend server will be running on [http://localhost:8000](http://localhost:8000)

## API Endpoints

- `/users`: User-related operations.
- `/products`: Product-related operations, requires authentication.

## Environment Variables

You need to set up a `.env` file with the following variables:

- `DATABASE_URL`: Your database connection string.
- `JWT_SECRET`: Secret key for JWT.

## Testing

Currently, there are no tests set up for this project.
