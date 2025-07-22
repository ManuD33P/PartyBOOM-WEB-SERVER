import { Socket } from "socket.io";
import { managerGameRoom } from "../../Controllers/index.ts";
import { EVENT_EMIT } from "../const/EVENT_EMIT.ts";
import { SocketInstance } from "../socketInstance.ts";

export function handleRoomList(socket:Socket){
    const listRoom = managerGameRoom.getAllRooms();
    const io = SocketInstance.getInstance();
    io.emit(EVENT_EMIT.ROOM_LIST,listRoom);
}