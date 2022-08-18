require('dotenv').config()
import {Neo4jGraphQL} from "@neo4j/graphql"
import { ApolloServer, gql} from "apollo-server"

const neo4j = require("neo4j-driver")
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));

const typeDefs = gql`
    interface Thing {
        description: String!   
    }
    type CreativeWork implements Thing {
        description: String!
    }
`;

const neo4jGraphQL = new Neo4jGraphQL({
    typeDefs,
    driver
});

neo4jGraphQL.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
        context: { driverConfig: { database: 'neo4j' } }
    });
    server.listen().then(({ url }) => {
        console.log(`GraphQL server ready at ${url}`);
    });
});