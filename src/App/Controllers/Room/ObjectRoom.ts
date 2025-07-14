import { IPlayer } from "../Player/Player.ts";

export interface IGameRoomConfig {
    timeBomb: number;
    idRoom: string;
    owner: string;
  }
  
export interface IGameRoom {
    config: IGameRoomConfig;
    players: IPlayer[];
  }
  

export interface IObjectRoom{
    setConfig: (Params: IGameRoomConfig) => void;
    joinPlayer: (player:IPlayer) => void;
    getConfig: () => IGameRoomConfig;
    getListPlayers: () => IPlayer[]
}

export class ObjectRoom implements IObjectRoom{
   
    constructor(private config:IGameRoomConfig, private players:IPlayer[]){}

    setConfig(Params: IGameRoomConfig):void{
        this.config = Params;
    }

    joinPlayer(player: IPlayer):void{
        this.players.push(player);
    }

    getConfig():IGameRoomConfig{
        return this.config
    }
    
    getListPlayers():IPlayer[]{
        return this.players
    }
}