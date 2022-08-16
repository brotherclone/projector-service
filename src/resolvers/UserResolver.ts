import 'reflect-metadata'
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
    FieldResolver,
    Root,
    Int,
    InputType,
    Field,
} from 'type-graphql'

import { User} from "../models/User";
import { ContextInterface } from "../contextProvider";

@InputType()
class UserId {
    @Field()
    id: number
}

@InputType()
class UserCreateInput {
    @Field()
    email: string

    @Field({ nullable: true })
    firstName: string

    @Field({ nullable: true })
    lastName: string
}


@Resolver(User)
export class UserResolver {
    @Query((returns) => User, { nullable: true })
    async getUserById(
        @Arg('data') data: UserId,
        @Ctx() ctx: ContextInterface
    ) {
        return ctx.prisma.user.findUnique({
            where:{
                id: data.id
            }
        })
    }
    @Mutation((returns) => User)
    async newUser(
        @Arg('data') data: UserCreateInput,
        @Ctx() ctx: ContextInterface,
    ): Promise<User> {
        return ctx.prisma.user.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName
            },
        })
    }
}
