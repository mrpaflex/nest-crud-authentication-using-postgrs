import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from 'src/Dto/tag.Dto';

@Controller('tag')
@UseInterceptors(ClassSerializerInterceptor)
export class TagController {
    constructor(private tagservice: TagService){}
    @Post('/create')
   async createuser(@Body() body: CreateTagDto){
        return await this.tagservice.createAUser(body)
    }

    @Get('/findall')
    getAlluser(){
        return this.tagservice.findAllUser()
    }
}
