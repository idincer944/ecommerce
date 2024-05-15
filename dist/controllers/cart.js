"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = exports.changeQuantity = exports.deleteItemFromCart = exports.addItemToCart = void 0;
const cart_1 = require("../schema/cart");
const not_found_1 = require("../exceptions/not-found");
const root_1 = require("../exceptions/root");
const __1 = require("..");
const addItemToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = cart_1.CreateCartSchema.parse(req.body);
    let product;
    try {
        product = yield __1.prismaClient.product.findFirstOrThrow({
            where: {
                id: validatedData.productId
            }
        });
    }
    catch (error) {
        throw new not_found_1.NotFoundException('Product not found', root_1.ErrorCode.PRODUCT_NOT_FOUND);
    }
    const existingItem = yield __1.prismaClient.cartItem.findFirst({
        where: {
            productId: product.id,
            userId: req.user.id
        }
    });
    if (existingItem) {
        yield __1.prismaClient.cartItem.update({
            where: {
                id: existingItem.id
            },
            data: {
                quantity: existingItem.quantity + validatedData.quantity
            }
        });
        res.json(existingItem);
    }
    else {
        const cart = yield __1.prismaClient.cartItem.create({
            data: {
                productId: product.id,
                quantity: validatedData.quantity,
                userId: req.user.id
            }
        });
        res.json(cart);
    }
});
exports.addItemToCart = addItemToCart;
const deleteItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield __1.prismaClient.cartItem.findFirstOrThrow({
            where: {
                id: +req.params.id,
                userId: req.user.id
            }
        });
        yield __1.prismaClient.cartItem.delete({
            where: {
                id: +req.params.id
            }
        });
        res.json({ message: "Product deleted successfully", success: true });
    }
    catch (error) {
        throw new not_found_1.NotFoundException('Product not found', root_1.ErrorCode.PRODUCT_NOT_FOUND);
    }
});
exports.deleteItemFromCart = deleteItemFromCart;
const changeQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = cart_1.ChangeQuantitySchema.parse(req.body);
    try {
        yield __1.prismaClient.cartItem.findFirstOrThrow({
            where: {
                id: +req.params.id,
                userId: req.user.id
            }
        });
        const updatedCart = yield __1.prismaClient.cartItem.update({
            where: {
                id: +req.params.id
            },
            data: {
                quantity: validatedData.quantity
            }
        });
        res.json(updatedCart);
    }
    catch (error) {
        throw new not_found_1.NotFoundException('Product not found', root_1.ErrorCode.PRODUCT_NOT_FOUND);
    }
});
exports.changeQuantity = changeQuantity;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield __1.prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    });
    res.json(cart);
});
exports.getCart = getCart;
