import http from 'node:http';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { setSocketServer } from './lib/socket.js';

export const startServer = () => {
  const port = Number(process.env.PORT || 3001);
  const app = createApp();
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
      credentials: true,
    },
  });

  setSocketServer(io);

  io.on('connection', (socket) => {
    socket.emit('connected', { timestamp: new Date().toISOString() });
  });

  httpServer.listen(port, () => {
    console.log(`DERP backend running on http://127.0.0.1:${port}`);
  });

  return { app, httpServer, io };
};
