import express from 'express';
// import router from './api';
import path from 'path';
// import bodyParser from 'body-parser';
// import { InitialDB } from "./db/conect";
import v1router from './v1/routes';

const app = express();
const port = 3030;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../frontend/dist'))),

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index'));
});

// app.get('/', (req, res) => {
//   res.send('Aqui va ir el frontend');
// });

app.use("/api/v1",v1router);

app.listen(port, () => {
  /***
   * function to create tables and fill with test data, only execute when the database does not exist.
   */
  // InitialDB();
  console.log(`server is listening on ${port}`);
});