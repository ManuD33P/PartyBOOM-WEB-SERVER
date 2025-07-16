import { IPlayer } from "../Player/Player.ts";

export interface IPlayerIterator{
    next(): IPlayer | null;
    reset(lifes:number):  void;
    getWinPlayer(): IPlayer | null;
    getPlayers(): IPlayer[];
    setPlayers(players:IPlayer[]): void;
}

export class PlayerIterator implements IPlayerIterator{
    private index = -1;
    constructor(private players:IPlayer[] = []){}

    next(): IPlayer | null {
        if(this.index < 0){ 
            this.index = 0;
            return this.players[this.index]; 
        }
        
        const totalAlivePlayers = this.players.filter(p => p.getLife()).length
        
        if(totalAlivePlayers <= 1) return null

        let startIndex = this.index;
        let nextPlayer: IPlayer | null = null;
        do{
            this.index = (this.index + 1) % this.players.length;
            const p = this.players[this.index];
            if(p.getLife()){
                nextPlayer = p;
                break;
            }
        }while(this.index !== startIndex)

        return nextPlayer?.getName() !== this.players[startIndex].getName() ? nextPlayer : null
    }

    reset(lifes:number): void{
        this.index = -1;
        this.players.forEach((p) => p.setLife(lifes))
    }

    getWinPlayer(): IPlayer | null {
        const playerWin = this.players.find(p => p.getLife())
        return playerWin || null
    }
    getPlayers(){
        return this.players
    }
    setPlayers(players: IPlayer[]){
        this.players = players;
    }
}