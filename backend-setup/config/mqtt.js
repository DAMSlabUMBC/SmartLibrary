// src/config/mqtt.js
import mqtt from "mqtt";
import logger from "../utils/logger.js";
import { config } from "./index.js";
import { setLatestReading } from "../services/deviceService.js";

/**
 * Sets up MQTT client connection and message routing.
 * @param {Object} options - optional dependencies for integration
 * @param {Object} options.io - socket.io instance for live updates
 * @param {Object} options.handlers - custom handler callbacks
 *        e.g., { onMessage: ({ topic, data }) => { ... } }
 * @returns {mqtt.MqttClient} the MQTT client instance
 */
export const setupMqtt = ({ io, handlers } = {}) => {
  // No username/password needed
  const client = mqtt.connect(config.mqtt.brokerUrl, {
    keepalive: 60,
    reconnectPeriod: 5000,
  });

  client.on("connect", () => {
    logger.info(` MQTT connected to ${config.mqtt.brokerUrl}`);
    client.subscribe(config.mqtt.topic, (err) => {
      if (err) logger.error(" MQTT subscription error:", err);
      else logger.info(`  Subscribed to topic: ${config.mqtt.topic}`);
    });
  });

  client.on("reconnect", () => logger.warn(" MQTT reconnecting..."));
  client.on("close", () => logger.warn("  MQTT connection closed."));
  client.on("error", (err) => logger.error("  MQTT client error:", err));

  client.on("message", (topic, message) => {
    const payload = message.toString();
    logger.info(` MQTT Message on [${topic}]: ${payload}`);

    let data;
    try {
      data = JSON.parse(payload);
      setLatestReading({topic,data});
    } catch (err) {
      logger.error(`  Failed to parse MQTT JSON. Topic: ${topic}, Raw: ${payload}`);
      return;
    }

    
    if (io) io.emit("device:status", { topic, data });
    if (handlers?.onMessage) handlers.onMessage({ topic, data });
  });

  return client;
};