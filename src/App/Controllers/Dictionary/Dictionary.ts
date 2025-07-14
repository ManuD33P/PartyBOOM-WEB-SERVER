import { loadFile } from "../../../utils/loadFileGame.ts";


export interface IDictionary{
    hasWord(word: string): boolean;
    setWord (word:string) : void;
    size() : number;
    setSyllable(syl: string): void;
    getRandomSyllable() :string; 

}



export class Dictionary implements IDictionary{
    private static instance: Dictionary;
    private dictionary: Set<string> = new Set();
    private syllable: string[] = [];
    private constructor(){
        const newDictionary = loadFile('../data/diccionary.json');
        const newSyllable = loadFile('../data/syllables.json')
        this.dictionary = new Set(newDictionary);
        this.syllable = newSyllable;
    }


    public static getInstance():IDictionary{
        if(!Dictionary.instance){
            Dictionary.instance = new Dictionary();
        }
        return Dictionary.instance
    }

    public hasWord(word:string): boolean{
        return this.dictionary.has(word);
    }

    public setWord(word:string) : void{
        this.dictionary.add(word);
    }

    public size(): number{
        return this.dictionary.size;
    }

    public setSyllable(syl:string): void {
        this.syllable.push(syl);

    };
    
    public getRandomSyllable():string{
        const numRandom = Math.floor(Math.random() * this.syllable.length)
        return this.syllable[numRandom]
    };
}