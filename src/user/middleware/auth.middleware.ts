import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { ExpressRequest } from "../types/expressRequest.interface";
import {verify} from 'jsonwebtoken'

import { JWT_SECRET } from "../jwtSecret/userjwt";
import { UserService } from "../user.service";

@Injectable()
 export class AuthMiddleware implements NestMiddleware{
constructor(private readonly authMiddleService: UserService){}
    async use(req: ExpressRequest,  res: Response, next: NextFunction ){//the function name must be use
        if (!req.headers.authorization){
            req.user = null
            next()
        }
        const storeToken = req.headers.authorization.split(' ')[1];
       
        try {
            const decode = verify(storeToken, JWT_SECRET);
            const databaseuser = await this.authMiddleService.findoneuser(decode.id)
            delete databaseuser.password;
            req.user = databaseuser;
            next();
        } catch (error) {
            req.user = null;
            next()
        }
    }

}