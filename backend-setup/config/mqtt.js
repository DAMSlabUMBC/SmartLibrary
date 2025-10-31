// src/config/mqtt.js
import mqtt from "mqtt";
import logger from "../utils/logger.js";
import { config } from "./index.js";
const client = mqtt.connect(config.mqtt.brokerUrl);


export const setupMqtt = () => {
  client.on("connect", () => {
    logger.info(" MQTT connected");
    client.subscribe(config.mqtt.topic, (err) => {
      if (err) logger.error(" MQTT subscription error:", err);
      else logger.info(`Subscribe to topic: ${config.mqtt.topic}`)
    });
  });

  client.on("message", (topic, message) => {
    logger.info(` MQTT Message: [${topic}] ${message.toString()}`);
    try {
        const data = JSON.parse(message.toString());
        console.log("Recived data", data);
    
    }catch(err){
        console.error("Error parsing message: ", err );
    }
    
  });

  client.on("error", (err) => {
    logger.error(" MQTT error:", err);
  });
};