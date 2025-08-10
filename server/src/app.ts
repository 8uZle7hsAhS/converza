import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';
import messageRouter from './routes/message.route';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(cookieParser());

// routes:
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/message', messageRouter);

export default app;
