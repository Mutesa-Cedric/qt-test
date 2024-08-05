require('dotenv').config();
import express = require("express");
import cors = require("cors");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import authRouter from "./modules/auth/authRouter";
import swaggerJsdoc = require('swagger-jsdoc');
import swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(bodyParser.json())
app.use(cookieParser());

app.use((req, res, next) => {

    const origin = req.headers.origin || "*";
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Contxprol-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
});


app.use((req, res, next) => {
    console.log(req.originalUrl, "\t", req.method, "\t", req.url);
    next();
});

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API Documentation',
            description: 'API Documentation',
            contact: {
                name: 'Mutesa Cedric'
            },
            servers: ["http://localhost:8000"]
        },
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header',
            },
        },
        security: [
            {
                Bearer: []
            }
        ]
    },
    apis: ["./src/modules/auth/*.ts", "./src/modules/users/*.ts", "./src/modules/products/*.ts"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/auth", authRouter);
app.get("/", (req, res) => {
    res.send("Hello world");
});
