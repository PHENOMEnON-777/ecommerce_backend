import { Request,Response } from "express"
import { changeQuantitySchema, createCartSchema } from "../schema/cart"
import { NotFoundExeption } from "../exeptions/not_found"
import { ErrorCode } from "../exeptions/root"
import { Prismaclient } from ".."
import { InternalExeption } from "../exeptions/internalexeption"


export const AddaitemToCart = async (req:Request,res:Response)=>{
const validation = createCartSchema.parse(req.body)
// let product = Product;
try {
    const product = await Prismaclient.product.findFirstOrThrow({
        where: {
          id: +validation.productId,
        },
      });
  
      // Await the cart creation and store the result in `cart`
      const cart = await Prismaclient.cartItem.create({
        data: {
          userId: req.user.id, // Assuming `req.user.id` is defined
          productId: product.id,
          quantity: +validation.quantity,
        },
      });
  
      // Return the cart response
      res.json(cart);
} catch (error) {
    const usernotfound = new NotFoundExeption('Product not found',ErrorCode.USER_NOT_FOUND)
    return res.status(usernotfound.statusCode).json({
     error:usernotfound.errors,
     message:usernotfound.message,
     ErrorCode:ErrorCode.USER_NOT_FOUND
    });
}
}

export const DeleteItemFromCart = async (req:Request,res:Response)=>{
try {
    await Prismaclient.cartItem.delete({
        where:{
            id: +req.params.id
        }
    })
    res.json({success:true})
} catch (error) {
    const usernotfound = new NotFoundExeption('Product not found',ErrorCode.USER_NOT_FOUND)
    return res.status(usernotfound.statusCode).json({
     error:usernotfound.errors,
     message:usernotfound.message,
     ErrorCode:ErrorCode.USER_NOT_FOUND
    });
}
}

export const changeQuantity = async (req:Request,res:Response)=>{
    try {
        const validatedata = changeQuantitySchema.parse(req.body);
const updatedCart = await Prismaclient.cartItem.update({
    where:{
        id: +req.params.id
    },
      data:{quantity: validatedata.quantity}
})

res.json(updatedCart);
    } catch (error) {
        const  exeptions = new InternalExeption('sonmething when wrong',error,ErrorCode.INTERNAL_EXCEPTION_HANDELING)
            res.status(exeptions.statusCode).json({
                error:exeptions.errors,
                message:exeptions.message,
                errorCode: ErrorCode.INTERNAL_EXCEPTION_HANDELING
               });
    }

}

export const getCart = async (req:Request,res:Response)=>{

    try {
        const cart = await Prismaclient.cartItem.findMany({
            where:{
                userId: req.user.id
            },
            include:{
                product:true
            }
        })
        res.json(cart)
    } catch (error) {
        const  exeptions = new InternalExeption('sonmething when wrong',error,ErrorCode.INTERNAL_EXCEPTION_HANDELING)
            res.status(exeptions.statusCode).json({
                error:exeptions.errors,
                message:exeptions.message,
                errorCode: ErrorCode.INTERNAL_EXCEPTION_HANDELING
               });
    }

}