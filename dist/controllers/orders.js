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
exports.listUserOrders = exports.changeStatus = exports.listAllOrders = exports.getOrderById = exports.cancelOrder = exports.listOrders = exports.createOrder = void 0;
const __1 = require("..");
const not_found_1 = require("../exceptions/not-found");
const root_1 = require("../exceptions/root");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // create a transaction
    return yield __1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const cartItems = yield __1.prismaClient.cartItem.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                product: true
            }
        });
        // list all the cart items and proceed if cart is not empty
        if (cartItems.length === 0) {
            res.json({ message: "cart is empty" });
        }
        // calculate the total price
        const price = cartItems.reduce((prev, current) => {
            return prev + (+current.product.price * current.quantity);
        }, 0);
        // fetch address of the user
        const address = yield tx.address.findFirst({
            where: {
                id: req.user.defaltShippingAddress
            }
        });
        // create order
        if (address !== null) {
            const order = yield tx.order.create({
                data: {
                    userId: req.user.id,
                    netAmount: price,
                    address: address.formattedAddress,
                    products: {
                        create: cartItems.map((cart) => {
                            return {
                                productId: cart.productId,
                                quantity: cart.quantity
                            };
                        })
                    }
                }
            });
            // create event
            const orderEvent = yield tx.orderEvent.create({
                data: {
                    orderId: order.id
                }
            });
            yield tx.cartItem.deleteMany({
                where: {
                    userId: req.user.id
                }
            });
            return res.json(order);
        }
        else {
            throw new not_found_1.NotFoundException('Address not found', root_1.ErrorCode.ADDRESS_NOT_FOUND);
        }
    }));
});
exports.createOrder = createOrder;
const listOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield __1.prismaClient.order.findMany({
        where: {
            userId: req.user.id
        }
    });
    res.json(orders);
});
exports.listOrders = listOrders;
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield __1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield tx.order.update({
                where: {
                    id: +req.params.id,
                    userId: req.user.id
                },
                data: {
                    status: 'CANCELED'
                }
            });
            if (!order) {
                throw new not_found_1.NotFoundException('Order not found', root_1.ErrorCode.ORDER_NOT_FOUND);
            }
            yield tx.orderEvent.create({
                data: {
                    orderId: order.id,
                    status: 'CANCELED'
                }
            });
            return order;
        }
        catch (error) {
            throw new not_found_1.NotFoundException('Order not found', root_1.ErrorCode.ORDER_NOT_FOUND);
        }
    }));
    res.json(transaction);
});
exports.cancelOrder = cancelOrder;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield __1.prismaClient.order.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            include: {
                products: true,
                events: true
            }
        });
        res.json(order);
    }
    catch (error) {
        throw new not_found_1.NotFoundException('Order not found', root_1.ErrorCode.ORDER_NOT_FOUND);
    }
});
exports.getOrderById = getOrderById;
const listAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let whereClause = {};
    const status = req.query.status;
    if (status) {
        whereClause = {
            status
        };
    }
    const skip = req.query.skip ? +req.query.skip : 0;
    const orders = yield __1.prismaClient.order.findMany({
        where: whereClause,
        skip: skip,
        take: 5
    });
    res.json(orders);
});
exports.listAllOrders = listAllOrders;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield __1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield tx.order.update({
                where: {
                    id: +req.params.id
                },
                data: {
                    status: req.body.status
                }
            });
            if (!order) {
                throw new not_found_1.NotFoundException('Order not found', root_1.ErrorCode.ORDER_NOT_FOUND);
            }
            yield tx.orderEvent.create({
                data: {
                    orderId: order.id,
                    status: req.body.status
                }
            });
            return order;
        }
        catch (error) {
            throw new not_found_1.NotFoundException('Order not found', root_1.ErrorCode.ORDER_NOT_FOUND);
        }
    }));
    res.json(transaction);
});
exports.changeStatus = changeStatus;
const listUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let whereClause = {
        userId: +req.params.id
    };
    const status = req.params.status;
    if (status) {
        whereClause = Object.assign(Object.assign({}, whereClause), { status });
    }
    const skip = req.query.skip ? +req.query.skip : 0;
    const orders = yield __1.prismaClient.order.findMany({
        where: whereClause,
        skip: skip,
        take: 5
    });
    res.json(orders);
});
exports.listUserOrders = listUserOrders;
