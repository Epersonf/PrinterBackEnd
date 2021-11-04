import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

import * as jwt from "jsonwebtoken";

@Injectable()
export class LoggedMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    const token = req.headers.authorization;
    if (token == null) throw new HttpException("no_token", HttpStatus.UNAUTHORIZED);

    const info: any = await jwt.verify(token, process.env.SECRET || "SECRET_DEFAULT");
    if (info == null) throw new HttpException("invalid_token", HttpStatus.UNAUTHORIZED);

    next();
  }
}
