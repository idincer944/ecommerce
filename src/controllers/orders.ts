import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createOrder = async (req: Request, res: Response) => {
        // create a transaction
        return await prismaClient.$transaction(async(tx) => {
            const cartItems = await prismaClient.cartItem.findMany({
                where: {
                    userId: req.user.id
                },
                include: {
                    product: true
                }
            })
            
            // list all the cart items and proceed if cart is not empty
            if(cartItems.length === 0){
                res.json({message: "cart is empty"})
            }
            
            // calculate the total price
            const price = cartItems.reduce((prev, current) => {
                return prev + (+current.product.price * current.quantity)
            }, 0)
        
            // fetch address of the user
            const address = await tx.address.findFirst({
                where: {
                    id: req.user.defaltShippingAddress
                }
            })

            // create order
            if(address !== null) {
                const order = await tx.order.create({
                    data: {
                        userId: req.user.id,
                        netAmount: price,
                        address: address.formattedAddress,
                        products: {
                            create: cartItems.map((cart) => {
                                return {
                                    productId: cart.productId,
                                    quantity: cart.quantity
                                }
                            })
                        }
                    }
                })
            // create event
            const orderEvent = await tx.orderEvent.create({
                data: {
                    orderId: order.id
                }
            })
            await tx.cartItem.deleteMany({
                where: {
                    userId: req.user.id
                }
            })
            return res.json(order)
            } else {
                throw new NotFoundException('Address not found', ErrorCode.ADDRESS_NOT_FOUND)
            }
        })
}

export const listOrders = async (req: Request, res: Response) => {
    const orders = await prismaClient.order.findMany({
        where: {
            userId: req.user.id
        }
    })
    res.json(orders)
}

export const cancelOrder = async (req: Request, res: Response) => {
    const transaction = await prismaClient.$transaction(async(tx) => {
        try {
            const order = await tx.order.update({
                where: {
                    id: +req.params.id,
                    userId: req.user.id
                },
                data: {
                    status: 'CANCELED'
                }
            })
            if (!order) {
                throw new NotFoundException('Order not found', ErrorCode.ORDER_NOT_FOUND)
            }
            
            await tx.orderEvent.create({
                data: {
                    orderId: order.id,
                    status: 'CANCELED'
                }
            })
            return order
        } catch (error) {
            throw new NotFoundException('Order not found', ErrorCode.ORDER_NOT_FOUND)
        }
    })
    res.json(transaction)
}

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await prismaClient.order.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            include: {
                products: true,
                events: true
            }
        })
        res.json(order)
    } catch (error) {
        throw new NotFoundException('Order not found', ErrorCode.ORDER_NOT_FOUND)
    }
    
}