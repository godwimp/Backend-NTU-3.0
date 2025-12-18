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

const options = {
    port: parseInt(process.env.MQTT_PORT || "8883"),
    host: process.env.MQTT_HOST || "",
    username: process.env.MQTT_USERNAME ||"",
    password: process.env.MQTT_PASSWORD || "",
    protocol: "mqtts" as const,
    ca: [fs.readFileSync("cert/emqxsl_water_mon.crt")],
};

const client = mqtt.connect(options);
client.on("connect", () => {
  console.log("Connected to MQTT");
  client.subscribe("water_monitor/data/panelA");
  client.subscribe("water_monitor/data/panelB");
  client.subscribe("water_monitor/data/panelC");
  client.subscribe("water_monitor/data/panelD");
  client.subscribe("water_monitor/data/panelE");
});

client.on("message", async (topic: string, message: Buffer) => {
  const data = JSON.parse(message.toString());
  io.emit(topic, data);

  switch (topic) {
    case "water_monitor/data/panelA":
      await PanelA.create(data);
      break;
    case "water_monitor/data/panelB":
      await PanelB.create(data);
      break;
    case "water_monitor/data/panelC":
      await PanelC.create(data);
      break;
    case "water_monitor/data/panelD":
      await PanelD.create(data);
      break;
    case "water_monitor/data/panelE":
      await PanelE.create(data);
      break;
    default:
      console.log(`No handler for topic ${topic}`);
  }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

export default httpServer;