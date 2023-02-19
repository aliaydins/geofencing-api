import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';

import { corsAllowedOrigins } from './config';
import router from '../router';

process.on('uncaughtException', (e) => {
   console.error(e);
});

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true, parameterLimit: 5000 }));
app.use(
   cors({
      origin: (origin: any, callback: any) => {
         if (corsAllowedOrigins?.split(',').includes('*')) {
            callback(null, '*');
         } else {
            callback(null, corsAllowedOrigins?.split(','));
         }
      },
      optionsSuccessStatus: 200,
   }),
);

app.use('', router);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => res.status(404).json({ message: 'Not Found Error' }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   res.status(500).json({ message: 'Internal error' });
});

export default app;
