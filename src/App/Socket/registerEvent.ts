import { Server } from "socket.io";
import { EVENT_EMIT } from "./const/EVENT_EMIT.ts";
import { 
    handleJoinRoom,
    handleCreateRoom,
    handleStartGame,
    handleRecvWord,
    handleRoomList,
    handleListUsers,
    handleSetName,
    handleUserDisconnect
 } from  "./EventHandlers/index.ts";
import { managerGameRoom, listUsers } from "../Controllers/index.ts";


export const registerEvent = (io:Server) : void => {
    io.on(EVENT_EMIT.CONNECTION, (socket)=>{
        console.log(`new client: ${socket.id}`);
        listUsers.addUser({name:'invitado', id:socket.id});

        socket.on(EVENT_EMIT.JOIN_ROOM, (data) => handleJoinRoom(socket,data));
        socket.on(EVENT_EMIT.CREATE_ROOM, (data) => handleCreateRoom(socket,data));
        socket.on(EVENT_EMIT.GAME_START, (data) => handleStartGame(socket, data));
        socket.on(EVENT_EMIT.RECV_WORD, (data) => handleRecvWord(socket,data));
        socket.on(EVENT_EMIT.ROOM_LIST,()=> handleRoomList(socket));
        socket.on(EVENT_EMIT.SETNAME, (data)=> handleSetName(socket,data));
        socket.on(EVENT_EMIT.LIST_USERS, ()=> handleListUsers(socket));
        socket.on(EVENT_EMIT.DISCONNECT, ()=> handleUserDisconnect(socket));
        
        const userList = listUsers.getUsers();

        io.emit(EVENT_EMIT.LIST_USERS, userList);
    });
}