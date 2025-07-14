import { Socket } from "socket.io";
import { EVENT_EMIT } from "../const/EVENT_EMIT.ts";
import { Player,PlayerProps } from "../../Controllers/index.ts";
import { IData } from "../const/data.ts";

export function handleJoinRoom(socket:Socket, data:IData){
    //Completar esta funcion con un roomMagener
    const idRoom = data.idRoom.toString();
    const props:PlayerProps = {
        name: data.name,
        idRoom: data.idRoom,
        id:socket.id,
        life:3
    }

    const newPlayer = new Player(props);


    socket.join(idRoom)
    socket.emit(EVENT_EMIT.ROOM_JOINED, newPlayer);
    socket.to(idRoom).emit(EVENT_EMIT.PLAYER_JOINED, newPlayer);

}