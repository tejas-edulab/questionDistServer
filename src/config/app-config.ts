import express, { Express } from 'express';
import cors from 'cors';
import logger from "../utils/winston";
import { basicLoggerMiddleware, detailedAccessLoggerMiddleware } from '../middlewares/morgan';
import routesV1 from '../features/v1';
import errorHandlingMiddleWare from '../middlewares/error.handler';
import { IApiErrors } from '../types/error';
import redisSession from '../middlewares/redis-session';
import keycloak from '../middlewares/keycloak';

const configureApp = (app: Express) => {
    app.use(basicLoggerMiddleware);
    app.use(detailedAccessLoggerMiddleware);
    app.use(cors({ origin: '*' }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(redisSession);
    app.use(keycloak.middleware()); // Keycloak Middleware
    app.get('/', (req, res) => res.send('Express + TypeScript Server'));
    app.use('/v1', routesV1); // V1 Routes
    app.use(errorHandlingMiddleWare);
    logger.info('Express configured');
    app.use('*', (req, res) => {
        res.status(404).json({ status: 404, error: IApiErrors.NOT_FOUND });
    });
};

export default configureApp;

