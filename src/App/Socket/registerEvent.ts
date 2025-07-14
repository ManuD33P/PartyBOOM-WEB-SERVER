import { Server } from "socket.io";
import { EVENT_EMIT } from "./const/EVENT_EMIT.ts";
import { 
    handleJoinRoom,
    handleCreateRoom
 } from  "./EventHandlers/index.ts";

export const registerEvent = (io:Server) : void => {
    io.on(EVENT_EMIT.CONNECTION, (socket)=>{
        console.log(`new client: ${socket.id}`);
        
        socket.on(EVENT_EMIT.JOIN_ROOM, (data) => handleJoinRoom(socket,data));
        socket.on(EVENT_EMIT.CREATE_ROOM, (data) => handleCreateRoom(socket,data));
        
    })
}