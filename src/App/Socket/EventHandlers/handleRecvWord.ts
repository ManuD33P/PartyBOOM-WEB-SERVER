import { Socket } from "socket.io";
import { IwordData } from "../const/data.ts";
import { managerGameRoom } from "../../Controllers/index.ts";

export function handleRecvWord(socket:Socket, data:IwordData){
    const idRoom = data.roomData.idRoom;
    const room = managerGameRoom.getRoom(idRoom);
    const game = room?.getGame();
    game?.recvWord(data);
}