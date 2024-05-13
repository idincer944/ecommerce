import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

const adminMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    if(req.user.role !== 'ADMIN') return next (new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    
    next();
}

export default adminMiddleware;