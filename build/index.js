"use strict";

var _graphql = require("@neo4j/graphql");

var _apolloServer = require("apollo-server");

var _utils = require("@apollo/utils.keyvaluecache");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

require('dotenv').config();

var neo4j = require("neo4j-driver");

var driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
var typeDefs = (0, _apolloServer.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    interface Thing {\n        description: String!   \n    }\n    type CreativeWork implements Thing {\n        description: String!\n    }\n"])));
var neo4jGraphQL = new _graphql.Neo4jGraphQL({
  typeDefs: typeDefs,
  driver: driver
});
neo4jGraphQL.getSchema().then(function (schema) {
  var server = new _apolloServer.ApolloServer({
    schema: schema,
    context: {
      driverConfig: {
        database: 'neo4j'
      }
    },
    cache: new _utils.InMemoryLRUCache({
      maxSize: Math.pow(2, 20) * 100,
      ttl: 300000
    })
  });
  server.listen({
    port: process.env.PORT || 4001
  }).then(function (_ref) {
    var url = _ref.url;
    console.log("GraphQL server ready at ".concat(url));
  });
});