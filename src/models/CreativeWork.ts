import 'reflect-metadata'
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
export class CreativeWork {
    @Field((type)=> ID)
    id:number
}