import { ErrorCode, HttpExeption } from "./root";

export class UnauthorizedExeption extends HttpExeption {
    constructor(message:string,errorCode:ErrorCode, errors?: any){
        super(message,errorCode,401,errors)
    }
}