"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const neo4j = require("neo4j-driver");
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
//
//
// const neo4jGraphQL = new Neo4jGraphQL({
//     typeDefs,
//     driver
// });
//
// neo4jGraphQL.getSchema().then((schema) => {
//     // Create ApolloServer instance to serve GraphQL schema
//     const server = new ApolloServer({
//         schema,
//         context: { driverConfig: { database: 'neo4j' } }
//     });
//
//     // Start ApolloServer
//     server.listen().then(({ url }) => {
//         console.log(`GraphQL server ready at ${url}`);
//     });
// });
