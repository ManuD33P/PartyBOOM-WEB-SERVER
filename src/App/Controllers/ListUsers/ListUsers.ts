
interface IUser{
    name: string,
    id: string
}

interface IListUsers{
    getUsers(): IUser[];
    getUser(id:string): IUser | null; 
    addUser(user:IUser): void;
    remUser(id:string): IUser | null;
}
class ListUsers implements IListUsers{
    private users:Map<string,IUser> = new Map()
    private instance: ListUsers | null = null;
    constructor(){
        if(!this.instance){
            this.instance = this;
        }

        return this.instance;
    }

    getUsers(){
        const newListUser = Array.from(this.users.values());
        return newListUser;
    }

    addUser(user:IUser){
        const key = user.id;
        this.users.set(key,user);
        console.log(`EVENT: SETNAME  name: ${user.name} id: ${user.id}`);
    }

    remUser(id:string){
        if(!this.users.has(id)) return null;
        const user = this.users.get(id) || null;
        this.users.delete(id);
        return user;
    }

    getUser(id: string): IUser | null {
        return this.users.get(id) || null;
    }
}


export const listUsers =  new ListUsers();