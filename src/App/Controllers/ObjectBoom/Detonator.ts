import { IBoom } from "./Boom.ts";

export interface IDetonator {
    start():void;
    stop():void;
}

export class Detonator implements IDetonator{
    private boom:IBoom;
    private socketEmitter: any;
    private interval:NodeJS.Timeout | number = 0 
    constructor(boom:IBoom,socketEmitter:any){
        this.boom = boom;
        this.socketEmitter = socketEmitter;
    }

    start(){
        this.interval = setInterval(()=>{
            this.boom.decrementTime();
            if(this.boom.isExploded()){
                clearInterval(this.interval)
                this.socketEmitter()
            }
        },1000)
    }

    stop(){
        clearInterval(this.interval)
    }

}