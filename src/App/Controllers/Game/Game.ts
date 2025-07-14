import { PlayerIterator,IPlayerIterator } from "../Turn/PlayerIterator.ts";
import { Player, IPlayer } from "../Player/Player.ts";
import { Dictionary, IDictionary } from "../Dictionary/Dictionary.ts";
import { Boom, IBoom } from "../ObjectBoom/Boom.ts";
import { Detonator, IDetonator } from "../ObjectBoom/Detonator.ts";


interface IGame{
    start(): void;
}
class Game{
    private playerIterator:IPlayerIterator = new PlayerIterator();
    constructor(

    ){}

    start(){
        // initi    
    }

}