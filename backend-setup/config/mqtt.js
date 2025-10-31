// src/config/mqtt.js
import mqtt from "mqtt";
import logger from "../utils/logger.js";
import { config } from "./index.js";

let client;

export const setupMqtt = () => {
  client = mqtt.connect(config.mqtt.brokerUrl, {
    username: config.mqtt.username,
    password: config.mqtt.password,
  });

  client.on("connect", () => {
    logger.info(" MQTT connected");
    client.subscribe("smartcampus/#", (err) => {
      if (err) logger.error(" MQTT subscription error:", err);
    });
  });

  client.on("message", (topic, message) => {
    logger.info(` MQTT Message: [${topic}] ${message.toString()}`);
    // Add logic to handle messages here (e.g., save to DB, emit via websocket)
  });

  client.on("error", (err) => {
    logger.error(" MQTT error:", err);
  });
};