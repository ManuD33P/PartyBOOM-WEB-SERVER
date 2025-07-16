import { Socket } from "socket.io";
import { IData } from "../const/data.ts";
import { managerGameRoom } from "../../Controllers/index.ts";

export function handleStartGame(socket:Socket,data:IData){
   const isStarted = managerGameRoom.startGame(
            data.idRoom,
            data.name
       );

    if(!isStarted) 
    return console.log(`Error in handleStartGame, Arg: ${data} state: ${isStarted}`);

    console.log(`The user: ${data.name} has started a new game in the room ${data.idRoom}`);

}
