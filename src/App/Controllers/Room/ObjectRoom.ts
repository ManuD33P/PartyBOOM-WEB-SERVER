import { IPlayer } from "../Player/Player.ts";

export interface IGameRoomConfig {
    timeBomb: number;
    idRoom: string;
    owner: string;
    lifes: number
  }
  
export interface IGameRoom {
    config: IGameRoomConfig;
    players: Map<string,IPlayer>;
  }
  

export interface IObjectRoom{
    setConfig(Params: IGameRoomConfig) : void;
    joinPlayer(player:IPlayer) : void;
    removePlayer(id:string) : void;
    getConfig(): IGameRoomConfig;
    getListPlayers(): Map<string,IPlayer>
    isPlayerExist(id:string): Boolean;
    isOwner(name:string): Boolean;
    startGame(): void;
}

export class ObjectRoom implements IObjectRoom{
    private players: Map<string,IPlayer> = new Map()
    // private game?: Game 
    constructor(private config:IGameRoomConfig){}

    setConfig(Params: IGameRoomConfig):void{
        this.config = Params;
    }

    joinPlayer(player: IPlayer):void{
        this.players.set(player.getIdPlayer(), player);
    }

    getConfig():IGameRoomConfig{
        return this.config
    }
    
    getListPlayers():Map<string,IPlayer>{
        return this.players
    }

    removePlayer(id: string): void {
        this.players.delete(id);
    }
    isOwner(name:string): Boolean{
        return this.config.owner === name
    }
    isPlayerExist(id: string): Boolean {
        return this.players.has(id);
    }
    startGame(): void {
        
    }
}