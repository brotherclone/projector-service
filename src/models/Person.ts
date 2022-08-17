import 'reflect-metadata'
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
export class Person {
    @Field((type)=> ID)
    id:number

    @Field((type) => String, { nullable: true })
    firstName?: string | null

    @Field((type) => String, { nullable: true })
    lastName?: string | null
}