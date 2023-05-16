import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/user-dto';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly appService: AuthService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) { }


    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('login')
    async login(@Body() body) {
        try {
            const { name, email, image, password } = body
            const generatePassword = (length: number) => {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            const gPassword = generatePassword(10)
            let user = await this.userModel.findOne({ email })
            if (!user) {
                password ? user = new this.userModel({ name, email, image, password })
                    : user = new this.userModel({ name, email, image, password: gPassword })
                user = await new this.userModel({ name, email, image, password: gPassword })
                user.save()
                const payload = { _id: user._id }
                const token = this.jwtService.sign(payload)
                return token
            }
            const token = this.jwtService.sign(generatePassword(10))
            return token

        } catch (err) {
            return err
        }
    }
    // @Post('/login')
    // async googleLogin(@Body() body: any, @Res() res: any): Promise<any> {
    //     try {
    //         const { name, email, image, password } = body
    //         const generatePassword = (length: number) => {
    //             let result = '';
    //             const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //             const charactersLength = characters.length;
    //             for (let i = 0; i < length; i++) {
    //                 result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //             }
    //             return result;
    //         }

    //         const gPassword = generatePassword(10)
    //         // const gPassword = process.env.PASSWORD

    //         let user = await this.userModel.findOne({ email })
    //         if (!user) {
    //             // password ? user = new this.userModel({ name, email, image, password })
    //             // : user = new this.userModel({ name, email, image, password: gPassword })
    //             user = await new this.userModel({ name, email, image, password: 'gPassword' })
    //             // user.save()
    //             return user.save()
    //         }
    //         return 'already'
    //     } catch (err) {
    //         return err
    //     }
    // }
}
