import { Request,Response } from "express"
import { AddaddressSchema } from "../schema/users"
import { Prismaclient } from "..";
import { NotFoundExeption } from "../exeptions/not_found";
import { ErrorCode } from "../exeptions/root";
import { User } from "@prisma/client";

export const Addaddress =async(req:Request, res:Response)=>{
    AddaddressSchema.parse(req.body);
    // let user: User;
    try {
            const address = await   Prismaclient.address.create({
                data:{
                    ...req.body,
                    userId: req.user.id
                }
            })
                res.json(address)
            
    
    } catch (error) {
        const usernotfound = new NotFoundExeption('User not found',ErrorCode.USER_NOT_FOUND)
       return res.status(usernotfound.statusCode).json({
        error:usernotfound.errors,
        message:usernotfound.message,
        ErrorCode:ErrorCode.USER_NOT_FOUND
       });
    }
}

export const Deleteddress =async(req:Request, res:Response)=>{
try {
    await Prismaclient.address.delete({
        where:{
            id: +req.params.id
        }
    })
    res.json({success:true})
    
} catch (error) {
    const usernotfound = new NotFoundExeption('address not found',ErrorCode.ADDRESS_NOT_FOUND)
    return res.status(usernotfound.statusCode).json({
     error:usernotfound.errors,
     message:usernotfound.message,
     ErrorCode:ErrorCode.USER_NOT_FOUND
    });
}
}

export const Listddress =async(req:Request, res:Response)=>{
try {
    const address = await Prismaclient.address.findMany({
        where:{
            userId: req.user.id
        }
    })
    res.json({address})
} catch (error) {
    const usernotfound = new NotFoundExeption('User not found',ErrorCode.USER_NOT_FOUND)
       return res.status(usernotfound.statusCode).json({
        error:usernotfound.errors,
        message:usernotfound.message,
        ErrorCode:ErrorCode.USER_NOT_FOUND
       });
}
}