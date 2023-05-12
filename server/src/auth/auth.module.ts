import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeatureAsync([
            {
              name: User.name,
              useFactory: () => {
                const schema = UserSchema;
                schema.pre("save", async function(next) {
                    const user = this
                    if(!user.isModified('password')){
                      next()
                    }
                    bcrypt.genSalt(10, function (err, salt) {
                      if (err) {
                        console.log(err);
                        return next(err);
                      }
                      bcrypt.hash(user.password, salt, function (err, hashedPassword) {
                        if (err) {
                          console.log(err);
                        }
                        user.password = hashedPassword;
                        next();
                      });
                    });
                  })
                return schema;
              },
              
            },
          ]),
        AuthModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
