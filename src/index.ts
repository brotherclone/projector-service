import 'reflect-metadata'
import * as typeGraphQL from 'type-graphql'
import { createServer } from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { prismaContext } from "./contextProvider";
import { GraphQLScalarType } from 'graphql'
import { UserResolver } from './resolvers/UserResolver'

const apiPath = "/" + process.env.API_PATH
const apiPort = process.env.PORT ? process.env.PORT : 3000

const startServer = async () => {
    const app = express()
    app.use(express.json())
    const schema = await typeGraphQL.buildSchema({
        resolvers:[UserResolver]
    })
    const httpServer = createServer(app)
    const apolloServer = new ApolloServer({schema, context: prismaContext})
    await apolloServer.start()
    apolloServer.applyMiddleware({
        app,
        path: apiPath
    })
    httpServer.listen({port: process.env.PORT || 4000}, () =>
        console.log('listening on ' +apiPort, 'serving at ' + apiPath )
    )
}

startServer()
