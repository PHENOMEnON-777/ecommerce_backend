import { ErrorCode, HttpExeption } from "./root";

export class NotFoundExeption extends HttpExeption {
    constructor(message:string,errorCode:ErrorCode){
        super(message,errorCode,404,null)
    }
}