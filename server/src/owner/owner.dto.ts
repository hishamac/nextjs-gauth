import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";


@ObjectType('OwnerType')
export class OwnerType {
    @Field()
    _id: string

    @Field()
    name: string;

    @Field(type=>[GraphQLJSONObject])
    cats:object[]
}

@InputType('OwnerInputType')
export class OwnerInputType {
    @Field()
    name: string;
}