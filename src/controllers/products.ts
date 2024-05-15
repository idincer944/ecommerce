import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async(req: Request, res: Response) => {
    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })

    res.json(product);
}

export const updateProduct = async(req: Request, res: Response) => {
    try {
        const product = req.body
        if(product.tags){
            product.tags = product.tags.join(', ')
        }

        const updateProduct = await prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: product
        })
        res.json(updateProduct);
    } catch (error) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const deleteProduct = async(req: Request, res: Response) => {
    try {
        await prismaClient.product.delete({
            where: {
                id: +req.params.id
            }
        })
        res.json({message: 'Product deleted'})
    } catch (error) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const listProducts = async(req: Request, res: Response) => {
    
    const count = await prismaClient.product.count()
    const skip = req.query.skip ? +req.query.skip : 0; 
    const products = await prismaClient.product.findMany({
        skip: skip,
        take: 5
    })
    res.json({
        count, data:products
    })
}

export const getProductById = async(req: Request, res: Response) => {
    try {
        const product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        })
        res.json(product)
    } catch (error) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND)
        
    }
}

export const searchProducts = async (req: Request, res: Response) => {
    const searchTerm = req.query.q?.toString() || ''; // Default to empty string if query parameter is undefined

    const page = req.query.page ? parseInt(req.query.page.toString()) : 1; // Default to page 1 if not specified
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 10; // Default to 10 items per page if not specified

    const skip = (page - 1) * pageSize;

    const products = await prismaClient.product.findMany({
        where: {
            OR: [
                { name: { contains: searchTerm } },
                { description: { contains: searchTerm } },
                { tags: { contains: searchTerm } }
            ]
        },
        skip: skip,
        take: pageSize
    });

    res.json(products);
}