import jwt from 'jsonwebtoken'
import * as services from "../services/index.js"
import dotenv from "dotenv"
const resolvers = {
    Query: {
      me() {
        return { id: '1', username: '@ava' };
      },
      login: async(_,args)=>{
        const user = args.user
        const pass = args.pass
        // let token
        const token = await services.login({user, pass})
          .then((result: any) => {
            // const dotenv = require('dotenv')
            if (result){
              dotenv.config()
              const SECRET = process.env.SECRET
              const newData = {
                id: result.id,
                names: result.names,
                lastNames: result.lastNames,
                sex: result.sex,
                email: result.email,
                phone: result.phone,
                photo: result.photo,
                role: result.role
              }
              return jwt.sign(newData, SECRET)
              // console.log(token)
              // return {token}
            }
          })
          .catch(err => {
            console.log(err)
            // res.status(401).json({ error: err })
            return null
          })
          return {token}
      }
    },
  };

export default resolvers