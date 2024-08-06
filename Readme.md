# Documentation

## Backend Setup

### Create Mysql/mariaDB database

```sql
CREATE DATABASE `qt_blog`;
```

### Create a .env file in the root directory of the project and add the following

```env
DATABASE_URL="mysql://root:password@localhost:3306/qt_blog"
JWT_SECRET="your_secret_key"

```

### Install dependencies

```bash
npm install
```

### Setup database and prisma client

```bash
npm run db:setup
```

### Start the server

```bash
npm run dev
```

now you can access the server at http://localhost:8000

### Swagger API documentation

```bash
http://localhost:8000/api-docs
```

## Frontend Setup

### Install dependencies

```bash
cd frontend
npm install
```

### Start the server

```bash
npm run dev
```

now you can access the frontend at http://localhost:3000

## Project Structure and Components

### Tools

backend :

- **Node.js** - JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js** - Web framework for Node.js.
- **Prisma** - Next-generation ORM for Node.js and TypeScript.
- **Swagger** - An open-source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful web services.

frontend :

- **React.js** - A JavaScript library for building user interfaces.
- **Tailwind CSS** - A utility-first CSS framework for rapidly building custom designs.
- **TypeScript** - A typed superset of JavaScript that compiles to plain JavaScript.
- **Axios** - Promise based HTTP client for the browser and node.js.