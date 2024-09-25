import { ErrorCode, HttpExeption } from "./root";

export class BadrequestExeption extends HttpExeption {
    constructor(message:string,errorCode:ErrorCode){
        super(message,errorCode,400,null)
    }
}