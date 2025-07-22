import { Socket } from "socket.io";
import { listUsers } from "../../Controllers/index.ts";
import { EVENT_EMIT } from "../const/EVENT_EMIT.ts";


export function handleListUsers(socket:Socket){ 
    const users = listUsers.getUsers();
    socket.emit(EVENT_EMIT.LIST_USERS,users);
}