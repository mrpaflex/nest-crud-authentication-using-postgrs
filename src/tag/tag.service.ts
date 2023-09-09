import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from 'src/Dto/tag.Dto';
import { tagEntity } from 'src/entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
constructor(@InjectRepository(tagEntity) private readonly tagrepo: Repository<tagEntity>){}

 async createAUser(createtageDto: CreateTagDto): Promise<tagEntity> {
    const newuser = await this.tagrepo.create(createtageDto);
    return await this.tagrepo.save(newuser)
 }

async findAllUser(): Promise<tagEntity[]>{
    const userfind = await this.tagrepo.find();
    if (!userfind) {
        throw new NotFoundException(`user does not exit`)
    }
    return await userfind;
    
}

}
