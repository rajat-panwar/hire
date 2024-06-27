import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { candidateRouter } from './routes/candidates';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

app.route("/api/v1/user", userRouter);
app.route("/api/v1/candidates", candidateRouter);

export default app