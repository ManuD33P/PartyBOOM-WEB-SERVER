import { Socket } from "socket.io";
import { SocketInstance } from "../socketInstance.ts";
import { listUsers } from "../../Controllers/index.ts";
import { EVENT_EMIT } from "../const/EVENT_EMIT.ts";

export function handleSetName(socket:Socket, name:string){
    const id = socket.id;
    const userObject ={
        name,
        id
    }
    listUsers.addUser(userObject)
    const newListUser = listUsers.getUsers();

    const io = SocketInstance.getInstance();

    io.emit(EVENT_EMIT.LIST_USERS,newListUser);
}