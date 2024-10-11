import { Request,Response } from "express";
import { Prismaclient } from "..";


export const CreateOrder =async (req:Request,res:Response)=>{
    return await Prismaclient.$transaction(async(tx)=>{
        const cartitems = await tx.cartItem.findMany({
            where:{
                userId: req.user.id
            },
            include:{
                product:true
            }
        })
        if(cartitems.length==0){
           return res.json({message:"cart Item is empty"})
        }
        const price =cartitems.reduce((prev,current)=>{
            return prev +(current.quantity * +current.product.price)
        },0);
        const address = await tx.address.findFirst({
            where:{
                
            }
        })
    })
}

export const listOrder =async (req:Request,res:Response)=>{
    
}

export const CancleOrder =async (req:Request,res:Response)=>{
    
}

export const getOrderbyId =async (req:Request,res:Response)=>{
    
}