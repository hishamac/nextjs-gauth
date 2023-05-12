import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './auth/user-dto';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller()
export class AuthController {
    constructor(
        private readonly appService: AuthService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
        ) { }


    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('/login')
    async googleLogin(@Body() body): Promise<any> {
        try {
            const { name, email, image,password } = body
            const generatePassword = (length)=>{
                let result = '';
                const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                for ( let i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            
            const gPassword = generatePassword(10)
            
            let user  = await this.userModel.findOne({email})
            if(!user){
                password ? user = new this.userModel({name,email,image,password}) 
                : user = new this.userModel({name,email,image,password:gPassword})
                return user.save()
            }
        }catch(err){
            return err
        }
  }
}