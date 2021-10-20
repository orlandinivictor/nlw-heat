import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { router } from './routes';

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cors());
app.use(router);

app.get('/github', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
  );
});

app.get('/signin/callback', (req, res) => {
  const { code } = req.query;

  return res.json(code);
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

export { serverHttp, io };
