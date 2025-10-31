
import { Server } from "socket.io";
import logger from "../utils/logger.js";
import { config } from "./index.js";

export const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    path: config.websocket.path,
  });

  io.on("connection", (socket) => {
    logger.info(` WebSocket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      logger.info(` WebSocket disconnected: ${socket.id}`);
    });


    socket.on("device:update", (data) => {
      logger.info(`Device update received: ${JSON.stringify(data)}`);
      io.emit("device:status", data); 
    });
  });

  return io;
};