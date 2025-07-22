import { Socket } from "socket.io";
import { SocketInstance } from "../socketInstance.ts";
import { listUsers } from "../../Controllers/index.ts";
import { EVENT_EMIT } from "../const/EVENT_EMIT.ts";

export function handleUserDisconnect(socket:Socket){
    const io = SocketInstance.getInstance(); 
    listUsers.remUser(socket.id);
    const newListUser =  listUsers.getUsers();
    io.emit(EVENT_EMIT.LIST_USERS,newListUser);
}