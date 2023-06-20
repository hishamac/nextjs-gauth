import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Owner } from '../owner/owner.schema';

class Characteristics {
    lifespan: string
    size: string
    coat: string
    color: string
}

@Schema()
export class Cat{
    @Prop()
    breed: string;

    @Prop()
    characteristics: Characteristics;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner'  })
    owner: Owner;
}


export type CatDocument = Cat & Document;
export const CatSchema = SchemaFactory.createForClass(Cat);