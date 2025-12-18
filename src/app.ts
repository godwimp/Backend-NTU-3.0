import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import router from "./routers/router";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import mqtt from "mqtt";
import fs from "fs";
import db from "./models";
import { createServer } from "http";
import { Server } from "socket.io";

const { PanelA, PanelB, PanelC, PanelD, PanelE } = db;

const MQTT_TOPICS = {
  PANEL_A: "water_monitor/data/panelA",
  PANEL_B: "water_monitor/data/panelB",
  PANEL_C: "water_monitor/data/panelC",
  PANEL_D: "water_monitor/data/panelD",
  PANEL_E: "water_monitor/data/panelE",
} as const;

const TOPIC_MODEL_MAP = {
  [MQTT_TOPICS.PANEL_A]: PanelA,
  [MQTT_TOPICS.PANEL_B]: PanelB,
  [MQTT_TOPICS.PANEL_C]: PanelC,
  [MQTT_TOPICS.PANEL_D]: PanelD,
  [MQTT_TOPICS.PANEL_E]: PanelE,
} as const;

const app: Application = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errorHandler);

const createMqttOptions = () => ({
  port: parseInt(process.env.MQTT_PORT || "8883"),
  host: process.env.MQTT_HOST || "",
  username: process.env.MQTT_USERNAME || "",
  password: process.env.MQTT_PASSWORD || "",
  protocol: "mqtts" as const,
  ca: [fs.readFileSync("cert/emqxsl_water_mon.crt")],
});

const subscribeToTopics = (client: mqtt.MqttClient): void => {
  Object.values(MQTT_TOPICS).forEach((topic) => {
    client.subscribe(topic);
  });
};
const handleMqttMessage = async (
  topic: string,
  message: Buffer
): Promise<void> => {
  const data = JSON.parse(message.toString());
  io.emit(topic, data);

  const model = TOPIC_MODEL_MAP[topic as keyof typeof TOPIC_MODEL_MAP];
  if (model) {
    await model.create(data);
  } else {
    console.log(`No handler for topic ${topic}`);
  }
};

const client = mqtt.connect(createMqttOptions());

client.on("connect", () => {
  console.log("Connected to MQTT");
  subscribeToTopics(client);
});

client.on("message", handleMqttMessage);

io.on("connection", (socket) => {
  console.log("Client connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

export default httpServer;
