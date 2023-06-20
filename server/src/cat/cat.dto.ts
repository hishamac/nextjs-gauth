import { ObjectType, Field, InputType } from "@nestjs/graphql";
import mongoose from "mongoose";
import { GraphQLJSONObject } from "graphql-type-json";

@ObjectType('Characteristics')
@InputType('CharacteristicsInput')
class Characteristics {
    @Field()
    lifespan: string

    @Field()
    size: 'small' | 'medium' | 'large'

    @Field()
    coat: 'short' | 'medium' | 'long'

    @Field()
    color: string
}

@ObjectType('CatType')
export class CatType {
    @Field()
    _id: string

    @Field()
    breed: string;
    
    @Field()
    characteristics: string;

    @Field(type=>GraphQLJSONObject)
    owner: object;
}

@InputType('CatInputType')
export class CatInputType {
    @Field()
    breed: string;

    @Field()
    characteristics: string;

    @Field()
    owner: string;
}