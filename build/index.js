"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const graphql_1 = require("@neo4j/graphql");
const apollo_server_1 = require("apollo-server");
const neo4j = require("neo4j-driver");
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
const typeDefs = (0, apollo_server_1.gql) `
    type Movie {
        title: String
        actors: [Actor!]! @relationship(type: "ACTED_IN", direction: IN)
    }

    type Actor {
        name: String
        movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
    }
`;
const neo4jGraphQL = new graphql_1.Neo4jGraphQL({
    typeDefs,
    driver
});
neo4jGraphQL.getSchema().then((schema) => {
    // Create ApolloServer instance to serve GraphQL schema
    const server = new apollo_server_1.ApolloServer({
        schema,
        context: { driverConfig: { database: 'neo4j' } }
    });
    // Start ApolloServer
    server.listen().then(({ url }) => {
        console.log(`GraphQL server ready at ${url}`);
    });
});
