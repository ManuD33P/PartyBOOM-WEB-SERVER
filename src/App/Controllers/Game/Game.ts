import { PlayerIterator,IPlayerIterator } from "../Turn/PlayerIterator.ts";
import {  IPlayer } from "../Player/Player.ts";
import { Dictionary, IDictionary } from "../Dictionary/Dictionary.ts";
import { Boom, IBoom } from "../ObjectBoom/Boom.ts";
import { Detonator, IDetonator } from "../ObjectBoom/Detonator.ts";
import { IGameRoom, IGameRoomConfig } from "../Room/ObjectRoom.ts";
import { SocketInstance } from "../../Socket/socketInstance.ts";
import { EVENT_EMIT } from "../../Socket/const/EVENT_EMIT.ts";
import { IwordData } from "../../Socket/const/data.ts";
export interface IGame{
    init(): void;
    recvWord(data:IwordData): void;
    nextPlayer(): void;
    reset(): void;
}
export class Game implements IGame{
    playerIterator: IPlayerIterator = new PlayerIterator()
    dictionary: IDictionary = Dictionary.getInstance();
    boom: IBoom = new Boom(10);
    detonator: Detonator | null = null;
    private config:IGameRoomConfig | null = null;
    constructor(params: IGameRoom){
        this.config = params.config;
        const players = params.players.values();
        const newArrayPlayers = Array.from(players);
        this.playerIterator.setPlayers(newArrayPlayers);
    }


    init(){ //iniciar
        const nextPlayer:IPlayer | null = this.playerIterator.next();
        if(!nextPlayer) throw Error('the first player not found');

        const syllable: string = this.dictionary.getRandomSyllable();
        if(!syllable) throw Error('Critical Error in the class Dicionary');

        // una instancia de servidor socket.io;
        const server = SocketInstance.getInstance();
        if(!server) throw Error("The socket has not been initialized");

        const idRoom = this.config?.idRoom
        if(!idRoom) throw Error("idRoom is null");
        server.to(idRoom).emit(
            EVENT_EMIT.GAME_START, 
            {
                players:this.playerIterator.getPlayers(),
                config: this.config
            });

        server.to(idRoom).emit(EVENT_EMIT.NEW_TURN,{
            player: nextPlayer,
            syllable
        });

        //Armando la bomba
        this.boom.setTime(this.config?.timeBomb || 10);

        const socketEmitter = () => {
            nextPlayer.subtractLife();

            server.to(idRoom).emit(
                EVENT_EMIT.BOOM,
                {
                    update: nextPlayer,
                }
            );
        }
        this.detonator = new Detonator(this.boom,socketEmitter);
        this.detonator.start();
    }

    recvWord(data:IwordData){
        const word = data.word;
        const idRoom= data.roomData.idRoom;

        const isCorrectWord = this.dictionary.hasWord(word);
        
        if(isCorrectWord){
            this.detonator?.stop();
            this.nextPlayer();
        }

        const server = SocketInstance.getInstance();

        server.to(idRoom).emit(
            EVENT_EMIT.WORD_RESULT,
            {
                data,
                result: isCorrectWord
            }
        )
    }

    nextPlayer(){
        const nextPlayer = this.playerIterator.next();
        const server = SocketInstance.getInstance();
        const idRoom = this.config?.idRoom;

        if(!idRoom) return

        if(!nextPlayer){
            const winner = this.playerIterator.getWinPlayer();
            server.to(idRoom).emit(EVENT_EMIT.GAME_OVER,winner);
            this.reset();
        }

        const syllable = this.dictionary.getRandomSyllable();
        this.boom.setTime(this.config?.timeBomb || 10);
        server.to(idRoom).emit(EVENT_EMIT.NEW_TURN,{
            player: nextPlayer,
            syllable
        });

        this.detonator?.start();

    }


    reset(){
        this.boom.setTime(this.config?.timeBomb || 10);
        this.playerIterator.reset(this.config?.lifes || 3);
    }
}