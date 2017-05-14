// @flow
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import open from 'open';

var schema = buildSchema(
  `
  type Query {
    hello: String
  }
`
);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use(
  '/graphql',
  graphqlHTTP(request => {
    const startTime = Date.now();
    return {
      schema: schema,
      rootValue: root,
      graphiql: true,
      formatError: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack,
        path: error.path,
      }),
      extensions({ document, variables, operationName, result }) {
        return { runTime: Date.now() - startTime };
      },
    };
  })
);
app.listen(4000, () => console.log('Servers started at localhost:4000/graphql'));
open('localhost:4000/graphql', 'chrome');
