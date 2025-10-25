import express from "express";
import http from "http";
import { config } from "./config/index.js"; 
import { setupMqtt } from "./config/mqtt.js";
import { setupWebSocket } from "./config/websocket.js";
import routes from "./routes/index.js";
import logger from "./utils/logger.js";

const app = express();
app.use(express.json());


app.use("/api", routes);


const server = http.createServer(app);

setupMqtt();
setupWebSocket(server);

const PORT = config.port || 4000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${config.env} mode`);
});