require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { ApolloEngine } = require('apollo-engine');
const cors = require('cors');

// Import GraphQL schema
const schema = require('./schema');

// Express App Setup
const app = express();

app.use(cors());

// the GraphQL endpoint
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true,
    context: {},
  })
);

// GraphiQL editor
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    context: {},
    query: `query StarWars {
  movies(query: "Star Wars") {
    title
    overview
  }
}`,
  })
);

app.use(express.static('public'));

// Apollo Engine
// const engine = new ApolloEngine({
//   apiKey: process.env.ENGINE_API_KEY,
//   stores: [{
//     name: "publicResponseCache",
//     inMemory: {
//       cacheSize: 10485760
//     }
//   }],
//   queryCache: {
//     publicFullQueryStore: "publicResponseCache"
//   }
// });

// Listen for connections
const PORT = process.env.PORT || 1234;
// Apollo Engine
// engine.listen({
//     port: PORT,
//     expressApp: app
//   },
//   () => {
//     console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
//   }
// )
// if using Apollo Engine, comment this out
app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});
