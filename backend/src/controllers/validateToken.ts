import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import { token } from '../types/index.js'
import { validator } from './validator.js'
import { GraphQLError } from 'graphql'

// const dotenv = require('dotenv')
dotenv.config()
const SECRET = process.env.SECRET

export const authorization = [
  { ruta: 'classes', method: 'GET', role: [1] },
  { ruta: 'classes', method: 'POST', role: [1] },
  { ruta: 'classes', method: 'PUT', role: [1] },
  { ruta: 'classes', method: 'DELETE', role: [1] },

  { ruta: 'profession', method: 'GET', role: [1] },
  { ruta: 'profession', method: 'POST', role: [1] },
  { ruta: 'profession', method: 'PUT', role: [1] },
  { ruta: 'profession', method: 'DELETE', role: [1] },

  { ruta: 'roles', method: 'GET', role: [1, 2, 3] },
  { ruta: 'roles', method: 'POST', role: [1] },

  { ruta: 'shifts', method: 'GET', role: [1, 2, 3] },
  { ruta: 'shifts', method: 'POST', role: [1] },

  { ruta: 'sections', method: 'GET', role: [1, 2, 3] },
  { ruta: 'sections', method: 'POST', role: [1] },

  { ruta: 'semesters', method: 'GET', role: [1, 2, 3] },
  { ruta: 'semesters', method: 'POST', role: [1] },

  { ruta: 'students', method: 'GET', role: [1, 2, 3] },
  { ruta: 'students', method: 'POST', role: [1] },
  { ruta: 'students', method: 'PUT', role: [1] },
  { ruta: 'students', method: 'DELETE', role: [1] },

  { ruta: 'persons', method: 'GET', role: [1, 2, 3] },
  { ruta: 'persons', method: 'POST', role: [1] },
  { ruta: 'persons', method: 'PUT', role: [1] },
  { ruta: 'persons', method: 'DELETE', role: [1] },

  { ruta: 'teachers', method: 'GET', role: [1] },
  { ruta: 'teachers', method: 'POST', role: [1] },
  { ruta: 'teachers', method: 'PUT', role: [1] },
  { ruta: 'teachers', method: 'DELETE', role: [1] },
  { ruta: 'teachersDelete', method: 'DELETE', role: [1] },

  { ruta: 'pensum', method: 'GET', role: [1] },
  { ruta: 'pensum', method: 'POST', role: [1] },
  { ruta: 'pensum', method: 'DELETE', role: [1] },

  { ruta: 'scores', method: 'GET', role: [1, 2, 3] },
  { ruta: 'scores', method: 'POST', role: [1, 2] },
  { ruta: 'scores', method: 'PUT', role: [1, 2] },

  { ruta: 'getClassesByProfessionAndSemesters', method: 'POST', role: [1, 2, 3] },
  { ruta: 'getTeachersByProfessionAndSemesters', method: 'POST', role: [1, 2, 3] }
]

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers.authorization
    if (headers) {
      const q: string = req.path.slice(1)
      const ruta = q.includes('/') ? q.split('/')[0] : q
      const method: string = req.method
      const token = headers.split(' ')[1]
      if (!token) return res.status(400).json({ message: 'No autorizado' })
      const role: any = jwt.verify(token, SECRET, (_, token: token) => token.role)
      const permision = authorization.find(e => e.ruta === ruta && e.method === method && e.role.find(y => y === role))
      if (!permision) return res.status(403).json({ message: 'No autorizado' })
      next()
    } else {
      return res.status(403).json({ message: 'No autorizado' })
    }
  } catch (e) {
    console.log(e)
    return res.status(410).json({ message: 'No autorizado' })
  }
}

declare module 'jsonwebtoken' {
  export interface profileToken extends jwt.JwtPayload {
    id: number,
    names: string,
    lastNames: string,
    sex: string,
    email: string,
    phone: number,
    photo: string | null,
    role: number,  
  }
}

export const newValidaToken = (req) => {
  const headers = req.headers.authorization
  if (headers && headers.length > 7){
    const token = headers.slice(7)
    const auth = <jwt.profileToken>jwt.verify(token, SECRET)
    if(auth){
      return auth
    }
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
  throw new GraphQLError('User is not authenticated', {
    extensions: {
      code: 'UNAUTHENTICATED',
      http: { status: 401 },
    },
  });
}

export const getProfile = (req: Request, res: Response) => {
  try {
    const headers = req.headers.authorization
    if (headers) {
      const token = headers.split(' ')[1]
      if (!token) return res.status(400).json({ message: 'No autorizado' })
      const data: any = jwt.verify(token, SECRET, (_, token: token) => token)
      const profile = validator.profile(data)
      if (!profile) return res.status(403).json({ message: 'No autorizado' })
      res.status(200).json(profile)
    } else {
      return res.status(403).json({ message: 'No autorizado' })
    }
  } catch (e) {
    console.log(e)
    return res.status(410).json({ message: 'No autorizado' })
  }
}
