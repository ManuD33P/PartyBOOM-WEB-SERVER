interface ISound{
    timeSound: string;
    boomSound: string;
}
export interface IBoom{
    setTime(time: number) : void;
    getTime(): number;
    getSound(): ISound;
    decrementTime(): number;
    increase(time: number): number;
    isExploded():boolean;
}


export class Boom implements IBoom{
    private time: number = 0;
    constructor(time: number){
        this.time= time;
    }

    setTime(time: number){
        this.time = time;
    }
    getTime(){
        return this.time
    }
    getSound(){
        return {
            timeSound: 'http:localhost:3001/ejemplo',
            boomSound: 'http:localhost:3001/ejemplo1'
        }
    }

    decrementTime(){
        if(this.time) this.time--;
        return this.time;
    }

    increase(time: number) {
        this.time += time;
        return this.time;
    }
    
    isExploded(){
        return this.time <= 0;
    } 

}