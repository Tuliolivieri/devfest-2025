import express, { NextFunction, Request, Response } from 'express';
import router from './routes';

const app = express();

app.use(express.json());

app.use(router);

const PORT = process.env.PORT;

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Mono running on ${PORT}`);
});
