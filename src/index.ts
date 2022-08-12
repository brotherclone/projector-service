import {createServer} from "http";
import express from "express";
import {ApolloServer, gql} from "apollo-server-express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const startServer = async () => {
    const app = express()
    const httpServer = createServer(app)
    const typeDefs = gql`
        type Board {
            id: ID!
            title: String!
            description: String
            path: String!
        }
        type Query {
            boards: [Board!]!
        }
    `;

    const resolvers = {
        Query: {
            boards: () => {
                return prisma.board.findMany()
            }
        },
    };


    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({
        app,
        path: '/api'
    })

    httpServer.listen({port: process.env.PORT || 4000}, () =>
        console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`)
    )
}

startServer()
