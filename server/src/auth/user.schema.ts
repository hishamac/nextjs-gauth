import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  image: string;

  @Prop()
  password:string
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
// generate token
UserSchema.methods.generateAuthToken = function (jwt) {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};