import { NextFunction } from "connect";
import './config/env';
import express from "express";
import { Request, Response } from "express-serve-static-core";
import logger from 'morgan';
import "express-async-errors"
import { AppError } from "./modules/errors/AppError";
import { routes } from "./routes";
import cors from 'cors';

import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(routes);

app.use('/poster', express.static('uploads'))
app.use('/api-swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "Error",
            message: err.message
        })
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error -  ${err.message}`
    })
})


app.listen(3000, () => console.log('API rodando na porta 3000... 🚀 '));
