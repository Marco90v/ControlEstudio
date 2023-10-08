import express from 'express'
import path from 'path'
import { conn, InitialDB } from './services/conect'
import v1router from './v1/routes'
import v2router from './v2/routes'
import cors from 'cors'

const ini = () => {
  const app = express()
  const port = 3030

  app.use(cors({
    // origin:['http://127.0.0.1:5173/']
    origin: '*',
    // origin:['http://localhost:3030/','http://localhost:5173/'],
    credentials: true
    // Access-Control-Allow-Credentials: true
    // 'Access-Control-Allow-Origin':true
  }))

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(express.static(path.join(__dirname, '../../frontend/dist'))),

  app.use('/api/v1', v1router)
  app.use('/api/v2', v2router)

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index'))
  })

  app.listen(port, () => {
    /***
     * function to create tables and fill with test data, only execute when the database does not exist.
     */
    // InitialDB();
    console.log(`server is listening on ${port}`)
  })
}
InitialDB(ini)
