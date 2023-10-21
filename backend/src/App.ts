import express from 'express';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import AppError from '@helpers/AppError';
import connection from '@configs/sequelize/connection';
import routes from '@routes/index';
import { errors } from 'celebrate';
import cors from 'cors';

dotenv.config();

(async () => {
  try {
    await connection.sync({ force: true, logging: false,  });
    Server();
  } catch (e) {
    console.log(`DB not found.`);
  }
})()

function Server() {
  const App = express();
  const SERVER_PORT = process.env.APP_SERVER_PORT ?? 3000;

  App.use(cors());
  App.use(express.json());
  App.use('/api', routes);
  App.use(errors());

  App.get('/', (req, res) => {
    res.json({ ping: true, });
  });

  App.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 400;
    let message = error.message;

    if (error instanceof AppError) {
      statusCode = error.statusCode;
    }

    return res.status(statusCode).json({ status: 'error', message, });

  });

  App.listen(SERVER_PORT, () => {
    console.log(`The server is open on http://localhost:${SERVER_PORT}`);
  });
}