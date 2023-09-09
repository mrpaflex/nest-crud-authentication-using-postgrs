import * as bcrypt from 'bcrypt';
//import { Hash } from 'crypto';

 export async function encodedPassword(rawpassword: any) {
    const salt = bcrypt.genSaltSync(5);
    return bcrypt.hashSync(rawpassword, salt)
 }

 //write this in the user service ..although it didn't work
    // const hashpassword = encodedPassword(createUserDto.password)
         // console.log(hashpassword)