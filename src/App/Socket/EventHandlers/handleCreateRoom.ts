import { Socket } from "socket.io";
import { IData } from "../const/data.ts";
import { EVENT_EMIT } from "../const/EVENT_EMIT.ts";

export function handleCreateRoom(socket:Socket, data:IData){
    const newRoom = {
        owner: data.name,
        idRoom: data.idRoom
    }
    socket.join(data.idRoom);
    socket.emit(EVENT_EMIT.JOIN_ROOM,newRoom);
    console.log(`Room Created for user ${data.name} RoomName: ${data.idRoom}`);

}