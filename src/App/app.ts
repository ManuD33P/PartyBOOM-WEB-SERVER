import { createServer } from "http";
import express from "express";
import { SocketInstance } from "./Socket/socketInstance.ts";

const app = express();

export const httpServer = createServer(app);

SocketInstance.init(httpServer);