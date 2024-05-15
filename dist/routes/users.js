"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_handler_1 = require("../error-handler");
const auth_1 = __importDefault(require("../middlewares/auth"));
const users_1 = require("../controllers/users");
const admin_1 = __importDefault(require("../middlewares/admin"));
const userRoutes = (0, express_1.Router)();
// User Routes
userRoutes.post('/address', auth_1.default, (0, error_handler_1.errorHandler)(users_1.addAddress));
userRoutes.delete('/address/:id', auth_1.default, (0, error_handler_1.errorHandler)(users_1.deleteAddress));
userRoutes.get('/address', auth_1.default, (0, error_handler_1.errorHandler)(users_1.listAddresses));
userRoutes.put('/', auth_1.default, (0, error_handler_1.errorHandler)(users_1.updateUser));
// Admin Routes
userRoutes.put('/role/:id', [auth_1.default, admin_1.default], (0, error_handler_1.errorHandler)(users_1.changeUserRole));
userRoutes.get('/', [auth_1.default, admin_1.default], (0, error_handler_1.errorHandler)(users_1.listUsers));
userRoutes.get('/:id', [auth_1.default, admin_1.default], (0, error_handler_1.errorHandler)(users_1.getUserById));
exports.default = userRoutes;
