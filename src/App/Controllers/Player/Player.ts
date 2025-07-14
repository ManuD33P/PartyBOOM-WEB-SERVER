export interface PlayerProps{
    name: string,
    id: string,
    life: number,
    idRoom: string;
}

export interface IPlayer{
    setName(name:string): void;
    getName(): string;
    setLife(life:number): void;
    getLife(): number;
    subtractLife(): void; 
    setIdRoom(idRoom:string): void;
    getIdRoom(): string;
    getIdPlayer(): string;
}

export class Player implements IPlayer{
    private name: string;
    protected id: string;
    private life: number;
    private idRoom: string ;

    constructor(Props: PlayerProps){
        this.name = Props.name;
        this.id = Props.id;
        this.life= Props.life;
        this.idRoom = Props.idRoom;
    }

    setName(name: string): void{
        this.name = name;
    }
    getName(): string{
        return this.name
    }
    setLife(life: number): void{
        this.life = life;
    }
    getLife(): number{
        if(this.life < 1) return 0;
        return this.life;
    }
    setIdRoom(idRoom: string): void{
        this.idRoom = idRoom;
    }
    getIdRoom(): string{
        return this.idRoom
    }

    subtractLife(){
        if(this.life) this.life--;
    }
    getIdPlayer(): string {
        return this.id;
    }
}
