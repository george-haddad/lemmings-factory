const dotenv = require('dotenv').config({ silent: true });
const Koa = require('koa');
const logger = require('koa-logger');
const { ApolloServer, gql } = require('apollo-server-koa');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const app = new Koa();
const readyRoute = require('./lib/routes/ready/index');
app.use(logger());
app.use(readyRoute.routes());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const port = process.env.PORT || 9000;
app.listen({ port }, () => {
  console.log('🚀 Server listening at http://localhost:9000');
  console.log(`🚀 Server listening at http://localhost:9000${server.graphqlPath}`);
});

app.on('error', err => {
  console.error('server error', err);
});

module.exports = server;
