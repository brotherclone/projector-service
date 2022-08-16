import 'reflect-metadata'
import { ObjectType, Field, ID } from "type-graphql"
import { IsEmail } from "class-validator"

@ObjectType()
export class User {
    @Field((type)=> ID)
    id:number

    @Field()
    @IsEmail()
    email: string

    @Field((type) => String, { nullable: true })
    firstName?: string | null

    @Field((type) => String, { nullable: true })
    lastName?: string | null
}