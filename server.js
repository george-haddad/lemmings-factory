const dotenv = require('dotenv').config({ silent: true });
const Koa = require('koa');
const logger = require('koa-logger');
const { ApolloServer, gql, graphiqlKoa } = require('apollo-server-koa');

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

const server = new ApolloServer({ typeDefs, resolvers });
const app = new Koa();
server.applyMiddleware({ app });
app.use(logger);

const PORT = process.env.PORT || 9000;

app.listen({ port: PORT }, () => {
  console.log('🚀 Server listening at http://localhost:9000');
  console.log(`🚀 Server listening at http://localhost:9000${server.graphqlPath}`);
});

app.on('error', err => {
  console.error('server error', err);
});
