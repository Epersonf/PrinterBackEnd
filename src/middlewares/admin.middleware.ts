import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

import * as jwt from "jsonwebtoken";
import UserRole from "../users/entities/role.type";

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    const token = req.headers.authorization;
    if (token == null) throw new HttpException("no_token", HttpStatus.UNAUTHORIZED);

    const info: any = await jwt.verify(token, process.env.SECRET || "SECRET_DEFAULT");
    if (info == null) throw new HttpException("invalid_token", HttpStatus.UNAUTHORIZED);

    if (info.role == UserRole.USER) throw new HttpException("no_permission", HttpStatus.UNAUTHORIZED);

    next();
  }
}
