import mqtt from "mqtt";

const brokerUrl = "mqtt://test.mosquitto.org:1883";
const client = mqtt.connect(brokerUrl);
const topic = "SMART-LIB-esp32-001/loopback";

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(topic);
});

client.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Received data:", data);
  } catch (err) {
    console.error("Error parsing message:", err);
  }
});