"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const apiPath = "/" + process.env.API_PATH;
const apiPort = process.env.PORT ? process.env.PORT : 3000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const httpServer = (0, http_1.createServer)(app);
    const typeDefs = (0, apollo_server_express_1.gql) `
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
                return prisma.board.findMany();
            }
        },
    };
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
    });
    app.get(apiPath + "/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const boardRes = yield prisma.board.findMany();
        res.json(boardRes);
    }));
    app.post(apiPath + "/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.body) {
            console.log(req.body);
            const { title, description, path } = req.body;
            const result = yield prisma.board.create({
                data: {
                    title,
                    description,
                    path
                }
            });
            res.json(result);
        }
        else {
            res.json({ message: "no request body" });
        }
    }));
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        path: apiPath
    });
    httpServer.listen({ port: process.env.PORT || 4000 }, () => console.log('listening on ' + apiPort, 'serving at ' + apiPath));
});
startServer();
