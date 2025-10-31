// src/config/websocket.js
import { Server } from "socket.io";
import logger from "../utils/logger.js";
import { config } from "./index.js";

let ioInstance = null;

/**
 * Initializes the WebSocket (Socket.IO) server.
 * @param {http.Server} server - The main HTTP server instance.
 * @returns {Server} The Socket.IO server instance.
 */
export const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }, // allow all origins (you can restrict later)
    path: config.websocket?.path || "/ws", // safe fallback path
    maxHttpBufferSize: config.websocket?.maxPayload || 1_000_000, // limit payload size to 1 MB
    pingInterval: 25000, // check client connection every 25s
    pingTimeout: 60000,  // drop client after 60s of no response
  });


  io.on("connection", (socket) => {
    
    logger.info(` WebSocket connected: ${socket.id}`);

    // Optional: simple auth using token in query string
    const token = socket.handshake.auth?.token;
    if (!isAuthorized(token)) {
      logger.warn(` Unauthorized socket connection: ${socket.id}`);
      socket.disconnect();
      return;
    }
  
  
    // Listen for client joining specific device/topic rooms
    socket.on("join", (topic) => {
      socket.join(topic);
      logger.info(` Socket ${socket.id} joined room: ${topic}`);
    });

    // Listen for updates from frontend clients (optional)
    socket.on("device:update", (data) => {
      logger.info(` Update received from ${socket.id}: ${JSON.stringify(data)}`);
      if (data?.topic) {
        io.to(data.topic).emit("device:status", data);
      } else {
        io.emit("device:status", data);
      }
    });
    
    socket.on("error", (err) => {
      logger.error(` Socket error from ${socket.id}: ${err.message}`);
    });

    socket.on("disconnect", (reason) => {
      logger.info(` WebSocket disconnected: ${socket.id} (${reason})`);
    });
  });

  ioInstance = io;
  return io;
};

/**
 * Allows other modules (like MQTT) to emit messages through WebSocket.
 * @param {mqtt.MqttClient} mqttClient - the MQTT client
 */
export const attachMqtt = (mqttClient) => {
  if (!ioInstance) {
    throw new Error("WebSocket not initialized — call setupWebSocket(server) first");
  }

  mqttClient.on("message", (topic, message) => {
    try {
      const data = JSON.parse(message.toString());
      logger.info(` Bridging MQTT → WebSocket | Topic: ${topic}`);
      ioInstance.to(topic).emit("device:status", { topic, data });
    } catch (err) {
      logger.error(" MQTT message parse error:", err);
    }
  });
};

// Example simple auth validator
function isAuthorized(token) {
  const validToken = process.env.SOCKET_AUTH_TOKEN || "defaultToken";
  return token === validToken;
}