import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/user/customDecorator/user.decorator';
import { profileResponseInterface } from './types/profileResponse.interface';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Controller('profile')
export class ProfileController {
constructor(private readonly profileservice: ProfileService){}

    @Get(':username')
    async getProfile(@User('id') currentUderId: number, @Param('username') profileUsername: string): Promise<profileResponseInterface>{
        const profile = await this.profileservice.getProfile(currentUderId, profileUsername)

        return  this.profileservice.buildProfileResponse(profile)
    }


    @Post('followed/:username')
    @UseGuards(AuthGuard)
   async followProfile(@User('id') currentUderId: number, @Param('username') profileusername: string): Promise<profileResponseInterface>{
    const profile = await this.profileservice.followuser(currentUderId, profileusername)

    return  this.profileservice.buildProfileResponse(profile)
   }

   @Delete('unfollowed/:username')
   @UseGuards(AuthGuard)
  async unfollowProfile(@User('id') currentUderId: number, @Param('username') profileusername: string): Promise<profileResponseInterface>{
   const profile = await this.profileservice.unfollowuser(currentUderId, profileusername)

   return  this.profileservice.buildProfileResponse(profile)
  }

}
