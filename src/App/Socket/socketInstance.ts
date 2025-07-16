import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { registerEvent } from "./registerEvent.ts";


export class SocketInstance{
    private static instance: Server
    private constructor(){}

     public static init(httpServer:HttpServer): void{
        SocketInstance.instance = new Server(httpServer,{
            cors: {
                origin: "*"
            }
        });
        registerEvent(SocketInstance.instance);
    }

    public static getInstance(){
        if(!SocketInstance.instance) throw Error('The socket has not been initialized');
        return SocketInstance.instance
    }

}