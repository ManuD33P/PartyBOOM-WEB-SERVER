import { IBoom } from "./Boom.ts";



export interface IDetonator {
    start():void;

}
export class Detonator implements IDetonator{
    private boom:IBoom
    private onTick: (time:number)=> void;
    constructor(boom:IBoom,onTick:(time:number)=> void){
        this.boom = boom;
        this.onTick = onTick
    }

    start(){
        const interval = setInterval(()=>{
            this.boom.decrementTime();
            this.onTick(this.boom.getTime())
            if(this.boom.isExploded()){
                clearInterval(interval)
                console.log("💥 BOOM!")
            }
        },1000)
    }
}