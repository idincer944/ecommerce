import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import { Product } from "@prisma/client";

export const addItemToCart = async (req: Request, res: Response) => {
    const validatedData = CreateCartSchema.parse(req.body)
    let product: Product;
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where:{
                id: validatedData.productId
            }
        })
    } catch (error) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND)
    }
    
    const existingItem = await prismaClient.cartItem.findFirst({
        where:{
            productId: product.id,
            userId: req.user.id
        }
    })

    if(existingItem){
        await prismaClient.cartItem.update({
            where:{
                id: existingItem.id
            },
            data:{
                quantity: existingItem.quantity + validatedData.quantity
            }
        })
        res.json(existingItem)
    } else {
        const cart = await prismaClient.cartItem.create({
            data:{
                productId: product.id,
                quantity: validatedData.quantity,
                userId: req.user.id
            }
        })
        res.json(cart)
    }
}

export const deleteItemFromCart = async (req: Request, res: Response) => {
    try {
        await prismaClient.cartItem.findFirstOrThrow({
            where:{
                id: +req.params.id,
                userId: req.user.id
            }
        });

        await prismaClient.cartItem.delete({
            where:{
                id: +req.params.id
            }
        });

        res.json({message: "Product deleted successfully", success: true});
    } catch (error) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
    }
}

export const changeQuantity = async (req: Request, res: Response) => {
    const validatedData = ChangeQuantitySchema.parse(req.body)
    try {
        await prismaClient.cartItem.findFirstOrThrow({
            where:{
                id: +req.params.id,
                userId: req.user.id
            }
        })
    
        const updatedCart = await prismaClient.cartItem.update({
            where:{
                id: +req.params.id
            },
            data:{
                quantity: validatedData.quantity
            }
        })
    
        res.json(updatedCart)
    } catch (error) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND)
    }
   
}

export const getCart = async (req: Request, res: Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where:{
            userId: req.user.id
        },
        include:{
            product: true
        }
    })
    res.json(cart)
}