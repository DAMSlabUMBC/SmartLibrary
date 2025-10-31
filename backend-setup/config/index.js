// src/config/index.js
import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  mqtt: {
    brokerUrl: process.env.MQTT_BROKER_URL,
    topic: process.env.TOPIC || "smartcampus/#",
  },
};