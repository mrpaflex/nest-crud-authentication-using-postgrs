import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profileType';
import { profileResponseInterface } from './types/profileResponse.interface';
import { followEntity } from './entity/follow.entity';

@Injectable()
export class ProfileService {

    constructor(@InjectRepository(CreateUserEntity) private readonly userRepository: Repository<CreateUserEntity>,
    @InjectRepository(followEntity) private readonly followRepository: Repository<followEntity>  ){}

    async getProfile(currentUderId: number, profileUsername: string): Promise<ProfileType>{
        const user = await this.userRepository.findOne({where: {
            username: profileUsername
        }});
        if(!user){
            throw new HttpException('profile does not exist', HttpStatus.NOT_FOUND)
        }

        const findfollowingUser = await this.followRepository.findOne({
            where: {
                followerId: currentUderId,
                followingId: user.id
            }
        })

        return { ...user,  following: Boolean(findfollowingUser)}

    }


async followuser(currentUderId: number, profileusername: string):Promise<ProfileType>{
    const user = await this.userRepository.findOne({where: {
        username: profileusername
    }});
    if(!user){
        throw new HttpException('profile does not exist', HttpStatus.NOT_FOUND)
    }
    if(currentUderId === user.id){
        throw new HttpException('you can not follow yourself', HttpStatus.BAD_REQUEST)
    }

    const findfollowingUser = await this.followRepository.findOne({where: {
        followerId: currentUderId,
        followingId: user.id
    }})

    if (!findfollowingUser) {
        const followedUser = new followEntity()

        followedUser.followerId = currentUderId,
        followedUser.followingId = user.id

        await this.followRepository.save(followedUser)
    }

    return { ...user, following: true}
}


async unfollowuser(currentUderId: number, profileusername: string):Promise<ProfileType>{
    const user = await this.userRepository.findOne({where: {
        username: profileusername
    }});
    if(!user){
        throw new HttpException('profile does not exist', HttpStatus.NOT_FOUND)
    }
    if(currentUderId === user.id){
        throw new HttpException('you can not follow yourself', HttpStatus.BAD_REQUEST)
    }

    await this.followRepository.delete({
        followerId: currentUderId,
        followingId: user.id
    });

    return { ...user, following: true}
}

    buildProfileResponse(profile: ProfileType): profileResponseInterface{
        delete profile.email
        delete profile.password
        return { profile };
    }
}
