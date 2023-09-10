import { CreateUserEntity } from "src/entities/user.entity";
import {Request} from 'express';


export interface ExpressRequest extends Request{

    user?: CreateUserEntity
}