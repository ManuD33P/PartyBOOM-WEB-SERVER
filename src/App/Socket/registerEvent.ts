import { Server } from "socket.io";
import { EVENT_EMIT } from "./const/EVENT_EMIT.ts";
import { 
    handleJoinRoom,
    handleCreateRoom,
    handleStartGame,
    handleRecvWord
 } from  "./EventHandlers/index.ts";

export const registerEvent = (io:Server) : void => {
    io.on(EVENT_EMIT.CONNECTION, (socket)=>{
        console.log(`new client: ${socket.id}`);
        socket.on(EVENT_EMIT.JOIN_ROOM, (data) => handleJoinRoom(socket,data));
        socket.on(EVENT_EMIT.CREATE_ROOM, (data) => handleCreateRoom(socket,data));
        socket.on(EVENT_EMIT.GAME_START, (data) => handleStartGame(socket, data));
        socket.on(EVENT_EMIT.RECV_WORD, (data) => handleRecvWord(socket,data));
    });
}