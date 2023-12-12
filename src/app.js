import express from 'express';
import cors from 'cors';
import routes from "./routes/index.js";

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}

app.use(express.json());
app.use(cors(corsOptions))

routes(app);

export default app