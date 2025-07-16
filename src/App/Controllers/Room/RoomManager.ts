import {IGameRoomConfig,ObjectRoom } from "./ObjectRoom.ts";
import { IPlayer, Player } from "../Player/Player.ts";

interface PlayerData {
    name:string
    id:string
}
export interface IManagerGameRoom {
    createRoom(config: IGameRoomConfig, playerData:PlayerData): void;
    getRoom(idRoom: string): ObjectRoom | undefined;
    addPlayerToRoom(idRoom: string, player: IPlayer): void;
    removePlayerFromRoom(idRoom: string, playerId: string): void;
    removeRoom(idRoom: string): void;
    roomExists(idRoom: string): boolean;
    getAllRooms(): ObjectRoom[];
    startGame(owner: string, idRoom:string):Boolean;
  }
  
class ManagerGameRoom implements IManagerGameRoom{
    private static instance: ManagerGameRoom;
    private rooms: Map<string,ObjectRoom> = new Map();

    private constructor(){}
    public static getInstance(): ManagerGameRoom{
        if(!ManagerGameRoom.instance){
            this.instance = new ManagerGameRoom();
        }
        return ManagerGameRoom.instance
    }
    createRoom(config: IGameRoomConfig, playerData:PlayerData): void{
        if (this.roomExists(config.idRoom)) {
            console.warn(`Room ${config.idRoom} already exists`);
            return;
        }
        const newRoom = new ObjectRoom(config);
        if(newRoom){
            const {idRoom} = config
            const playerProps= {
                ...playerData,
                idRoom,
                life:config.lifes
            }
            const newPlayer = new Player(playerProps)
            newRoom.joinPlayer(newPlayer);
            this.rooms.set(idRoom,newRoom)
            console.log(`New Room created IdRoom:${config.idRoom} for the player ${playerData.name}`)
        }
    }
    
    getRoom(idRoom: string): ObjectRoom | undefined {
        return this.rooms.get(idRoom)
    }
    
    addPlayerToRoom(idRoom: string, player: IPlayer): void {
        if(!this.roomExists(idRoom)) return;
        const room = this.getRoom(idRoom);
        room?.joinPlayer(player);
        console.log(`The user ${player.getName()} has entered to room: ${idRoom}`)
    }
    removePlayerFromRoom(idRoom: string, playerId: string): void {
        if(!this.roomExists(idRoom)) return
        const room = this.getRoom(idRoom);
        if(!room?.isPlayerExist(playerId)) return
        room.removePlayer(playerId)
        console.log(`The user ${playerId} has removed of the room ${idRoom}`)
    }

    removeRoom(idRoom: string): void {
        if(!this.roomExists(idRoom)) return
        this.rooms.delete(idRoom);
        console.log(`La sala removida  id:${idRoom}`)
    }
    
    roomExists(idRoom: string): boolean {
        return this.rooms.has(idRoom)
    }
    getAllRooms(): ObjectRoom[] {
        return Array.from(this.rooms.values())
    }

    startGame(owner: string, idRoom: string): Boolean {
        const room = this.getRoom(idRoom);
        const isOwner = room?.isOwner(owner);

        if(!isOwner || !room) return false  
        
        return room?.startGame();
    }
}

export const managerGameRoom = ManagerGameRoom.getInstance(); 