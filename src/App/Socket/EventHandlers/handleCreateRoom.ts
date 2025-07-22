import { Socket } from "socket.io";
import { IData } from "../const/data.ts";
import { EVENT_EMIT } from "../const/EVENT_EMIT.ts";
import { managerGameRoom } from "../../Controllers/index.ts";
import { SocketInstance } from "../socketInstance.ts";

export function handleCreateRoom(socket:Socket, data:IData){
    const playerData = {
        name: data.name,
        id: socket.id
    }

    const roomConfig = {
        timeBomb: 10,
        idRoom: data.idRoom,
        owner:data.name,
        lifes:3
    }
    managerGameRoom.createRoom(roomConfig,playerData);
    const listRooms = managerGameRoom.getAllRooms();
    const io = SocketInstance.getInstance();

    io.emit(EVENT_EMIT.ROOM_LIST,listRooms);
    socket.emit(EVENT_EMIT.JOIN_ROOM,playerData);
    
    console.log(`Room Created for user ${data.name} RoomName: ${data.idRoom}`);

}