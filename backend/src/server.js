import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './config/swaggerConfig';
import authenticateToken from './middlewares/authenticateToken';
import cors from 'cors';

const compression = require('compression');

// Setup log4js
const log4js = require('./utils/log4js');

process.on('uncaughtException', (err) => {
    log4js.error(`There was an uncaught error: ${err}` )
    console.error('There was an uncaught error', err);
    process.exit(1);
});

dotenv.config();

// Setup Express
const app = express();
const port = process.env.PORT || 3001;

app.use(compression());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Setup body-parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setup CORS (place this before your routes)
app.use(cors({
    origin: 'http://localhost:3000', // 允许的前端域名
    credentials: true, // 允许发送和接收Cookie
}));

app.use(cookieParser());

// Setup token authenticate
app.use(authenticateToken);

// Setup our routes.
import routes from './routes/index.js';
import cookieParser from "cookie-parser";
app.use('/', routes);

// Start the DB running. Then, once it's connected, start the server.
mongoose.connect( process.env.DB_URL, { useNewUrlParser: true })
    .then(() => app.listen(port, () => log4js.info(`App server listening on port ${port}!`)));
