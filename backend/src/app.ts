import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';
// import { json } from 'body-parser';
// import gql from 'graphql-tag';
// import { readFileSync } from 'fs';
// import { loadSchemaSync } from '@graphql-tools/load'

import typeDefs from './graphql/schema.js'
import resolvers from './graphql/resolvers.js'
import { newValidaToken } from './controllers/validateToken.js';

const port = 3030

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const resolvers = {
//   Query: {
//     me() {
//       return { id: '1', username: '@ava' };
//     },
//   },
// };

const app = express();
// import { buildSubgraphSchema } from "@apollo/federation";

// export const schema = buildSubgraphSchema([
//   { typeDefs: UserTypeDefs, resolvers: UserResolvers },
//   { typeDefs: AccountTypeDefs, resolvers: AccountResolvers },
// ]);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  formatError: (formattedError) => {
    return {
      message: formattedError.message,
      code: formattedError.extensions.code,
      http: formattedError.extensions.http,
    }
  },
});



// console.log(__dirname)

await server.start();

// Note the top-level await!
// const { url } = await startStandaloneServer(server);
app.use(cors({
    origin: '*',
    // origin:['http://localhost','http://localhost:3030/','http://localhost:5173/', '*'],
    credentials: true
    // Access-Control-Allow-Credentials: true
    // 'Access-Control-Allow-Origin':true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../frontend/dist'))),

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../frontend/dist/index'))
// })



app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, {
  context:async ({req}) => {
    const headers = req.headers.authorization;
    // if (headers && headers.length > 7){
    //   const token = headers.slice(7)
    //   const auth = jwt
    // }
    // console.log(headers)
    // return headers
    // console.log(headers)
    return headers ? newValidaToken(headers) : ""
    // return newValidaToken(headers)
    // return null
  }
}));
// app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));
// console.log(`🚀  Server ready at ${url}`);

app.listen(port, () => {
    /***
     * function to create tables and fill with test data, only execute when the database does not exist.
     */
    // InitialDB();
    console.log(`server is listening on ${port}`)
})
