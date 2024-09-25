import { HttpExeption } from "../exeptions/root";
import { NextFunction, Request,Response } from "express";

export const errorMiddleware = (error: HttpExeption, req:Request, res:Response, next:NextFunction)=>{
    res.status(error.errorCode).json({
        message:error.message,
        errorCode:error.errorCode,
        errors:error.errors
    })
}