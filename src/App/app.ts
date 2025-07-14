import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { registerEvent } from "./Socket/registerEvent.ts";

const app = express();
export const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: "*"
    }
});

registerEvent(io);





