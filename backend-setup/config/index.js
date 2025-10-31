import dotenv from "dotenv";

dotenv.config();
const toNumber = (value, fallback) =>{
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback
}

export const config = {
    env: process.env.NODE_ENV || "development", 
    port: toNumber(process.env.PORT, 4000),
    mqtt:
    {
        brokerUrl: process.env.MQTT_BROKER_URL ?? "",
        topic: process.env.TOPIC || "smartcampus/#",

    },
    websocket:{
        path: process.env.WEBSOCKET_PATH || "/ws",
        port: toNumber(process.env.WEBSOCKET_PORT, 8080),
        maxPayload: toNumber(process.env.WS_MAX_PAYLOAD, 1_000_000),


    },

};