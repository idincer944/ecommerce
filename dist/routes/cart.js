"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_handler_1 = require("../error-handler");
const auth_1 = __importDefault(require("../middlewares/auth"));
const cart_1 = require("../controllers/cart");
const cartRoutes = (0, express_1.Router)();
// User Routes
cartRoutes.post('/', auth_1.default, (0, error_handler_1.errorHandler)(cart_1.addItemToCart));
cartRoutes.put('/:id', auth_1.default, (0, error_handler_1.errorHandler)(cart_1.changeQuantity));
cartRoutes.delete('/:id', auth_1.default, (0, error_handler_1.errorHandler)(cart_1.deleteItemFromCart));
cartRoutes.get('/', auth_1.default, (0, error_handler_1.errorHandler)(cart_1.getCart));
exports.default = cartRoutes;
