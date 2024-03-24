import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';
import typeDefs from './graphql/schema.js'
import resolvers from './graphql/resolvers.js'
import { newValidaToken } from './controllers/validateToken.js';

const port = 3030
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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

await server.start();

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

app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, {
  context:async ({req}) => {
    const headers = req.headers.authorization;
    return headers ? newValidaToken(req) : ""
  }
}));

app.listen(port, () => {
    /***
     * function to create tables and fill with test data, only execute when the database does not exist.
     */
    // InitialDB();
    console.log(`server is listening on ${port}`)
})
