// import { NextFunction,Request,Response } from "express"
// import { ErrorCode, HttpExeption } from "../exeptions/root"
// import { InternalExeption } from "../exeptions/internalexeption"


// export const errorHandler = (method: Function)=> {
//     return async (req:Request,res:Response,next:NextFunction) =>{
//         try {
//           await  method(req,res,next)
//         } catch (error:any) {
//             let exeptions:HttpExeption;
//             if(error instanceof HttpExeption){
//                 exeptions =error;
//             }
//             else{
//                 exeptions = new InternalExeption('sonmething when wrong',error,ErrorCode.INTERNAL_EXCEPTION_HANDELING)
//             }
//            res.status(exeptions.statusCode).json({
//             error:exeptions.errors,
//             message:exeptions.message,
//             errorCode: ErrorCode.INTERNAL_EXCEPTION_HANDELING
//            })
//         }
//     }
// }