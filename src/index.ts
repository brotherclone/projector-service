import {createServer} from "http";
import express from "express";
import {ApolloServer, gql} from "apollo-server-express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const apiPath = "/" + process.env.API_PATH
const apiPort = process.env.PORT ? process.env.PORT : 3000

const startServer = async () => {
    const app = express()
    app.use(express.json());
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

    app.get(apiPath+"/test", async (req, res) =>{
        const boardRes = await prisma.board.findMany()
        res.json(boardRes)
    })

    app.post(apiPath+"/test", async (req, res) => {
        if(req.body){
            console.log(req.body)
            const { title, description, path } = req.body
            const result = await prisma.board.create({
                data:{
                    title,
                    description,
                    path
                }
            })
            res.json(result)
        }else{
            res.json({message: "no request body"})
        }

    })


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
