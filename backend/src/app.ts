import express from 'express';
import router from './api';
import bodyParser from 'body-parser';
import { conectar, desconectar, InitialDB } from "./db/conect";

const app = express();
const port = 3030;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Aqui va ir el frontend');
});

app.use(router);

app.listen(port, () => {
  /***
   * function to create tables and fill with test data, only execute when the database does not exist.
   */
  // InitialDB();
  console.log(`server is listening on ${port}`);
});