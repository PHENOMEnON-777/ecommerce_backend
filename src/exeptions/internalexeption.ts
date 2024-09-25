import { HttpExeption } from "./root";

export class InternalExeption extends HttpExeption {
    constructor(message:string, errors:any,errorCode:number){
        super(message,errorCode,500,errors)
    }
}