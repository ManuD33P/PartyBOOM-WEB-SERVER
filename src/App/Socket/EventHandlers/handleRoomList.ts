import { Socket } from "socket.io";
import { managerGameRoom } from "../../Controllers/index.ts";
import { EVENT_EMIT } from "../const/EVENT_EMIT.ts";

export function handleRoomList(socket:Socket){
    const listRoom = managerGameRoom.getAllRooms();
    socket.emit(EVENT_EMIT.ROOM_LIST,listRoom);
}