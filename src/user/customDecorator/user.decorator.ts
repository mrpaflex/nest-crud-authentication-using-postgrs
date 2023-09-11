import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((data: any, ctx: ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest()
    if(!request){
        return null;
    }else if(data){
        return request.user[data]
    }else{
        return request.user;
    }
})