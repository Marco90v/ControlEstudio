import * as services from '../services'
import { transformTeacher } from '../transform'
import { dbPersons, dbTeachers2, oldFormat, pensumNotFormat, pesumFormat, scores } from '../types'
import { validator } from './validator'
import jwt from 'jsonwebtoken'

export const getAllAdminWorkOut = (_, res) => {
  services.getAllAdmin()
    .then(resolve => res.status(200).json(resolve))
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const getAllWorkOut = (req, res) => {
  const table: string = req.path.slice(1)
  services.getAll(table)
    .then(resolve => res.status(200).json(resolve))
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const setValuesSingleTableWorkOut = (req, res) => {
  const table: string = req.path.slice(1)
  const dataValidated = validator[table](req.body)
  if (dataValidated) {
    services.insertSingle(table, dataValidated)
      .then((result: any) => {
        const { insertId } = result
        res.status(200).json({ insertId })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('setValuesSingleTableWorkOut', 'Error en la estructura de datos')
    res.status(400).json({ error: 'Error en la estructura de datos' })
  }
}

export const updateValueSingleTableWorkOut = (req, res) => {
  const table: string = req.path.slice(1)
  const id = validator.id(req.body)
  const data = validator[table](req.body)
  const dataValidated = { ...id, ...data }
  if (id && data) {
    services.updateSingle(table, dataValidated)
      .then(() => {
        res.status(200).json(true)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('updateValueSingleTableWorkOut', 'Error en la estructura de datos')
    res.status(400).json({ erro: 'Error en la estructura de datos' })
  }
}

export const deleteValueSingleTableWorkOut = (req, res) => {
  const table: string = req.path.slice(1)
  const dataValidated = validator.id(req.body)
  if (dataValidated) {
    services.deleteSingle(table, dataValidated)
      .then(() => {
        res.status(200).json({ deleteId: req.body.id })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('deleteValueSingleTableWorkOut', 'Error en la estructura de datos')
    res.status(400).json({ error: 'Error en la estructura de datos' })
  }
}

export const deleteValueTeachersWorkOut = (req, res) => {
  const table: string = req.path.slice(1)
  const dataValidated = validator.IdPersons(req.body)
  if (dataValidated) {
    services.deleteByIdPerson('teachers', dataValidated)
      .then(() => {
        res.status(200).json({ deleteId: req.body.idPersons })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('deleteValueSingleTableWorkOut', 'Error en la estructura de datos')
    res.status(400).json({ error: 'Error en la estructura de datos' })
  }
}

export const setValuesMultipleTableWorkOut = (req, res) => {
  const table: string = req.path.slice(1)
  const dataValidated = validator[table](req.body)
  if (dataValidated) {
    const table: string = req.path.slice(1)
    services.insertMultiple(table, dataValidated)
      .then((result: any) => {
        const { insertId } = result
        res.status(200).json({ insertId })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('setValuesMultipleTableWorkOut', 'Error en la estructura de datos')
    res.status(400).json({ error: 'Error en la estructura de datos' })
  }
}

export const setValuesTeachersWorkOut = (req, res) => {
  const table: string = req.path.slice(1)
  const dataValidated = validator[table](req.body)
  if (dataValidated) {
    const table: string = req.path.slice(1)
    services.insertMultipleTeacher(table, dataValidated)
      .then((result: any) => {
        const { insertId } = result
        res.status(200).json({ insertId })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('setValuesTeachersWorkOut', 'Error en la estructura de datos')
    res.status(400).json({ error: 'Error en la estructura de datos' })
  }
}

export const getAllTeachersWorkOut = (_, res) => {
  services.getAllTeachers()
    .then((result: oldFormat[]) => {
      res.status(200).json(transformTeacher(result))
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const getAllTeachersWorkOut2 = (_, res) => {
  services.getAllTeachers2()
    .then((result: dbTeachers2[]) => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const getSingleTeachersWorkOut = (req, res) => {
  const idTeacher: number = Number(req.params.id)
  services.getTeacher(idTeacher)
    .then((result: oldFormat[]) => {
      res.status(200).json(transformTeacher(result))
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const getSingleTeachersWorkOut2 = (req, res) => {
  const idTeacher: number = Number(req.params.id)
  services.getTeacher2(idTeacher)
    .then((result: dbTeachers2[]) => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const getPersonByRoleWorkOut = (req, res) => {
  const personRole: number = Number(req.params.role)
  services.getPersonByRole(personRole)
    .then((result: dbPersons[]) => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const updatePersonById = (req, res) => {
  const table: string = req.path.slice(1)
  const dataValidated = { ...validator[table](req.body), id: req.body.id }
  services.updateSingle(table, dataValidated)
    .then((result: dbPersons[]) => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const getAllStudentsWorkOut = (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 0
  services.getAllStudents(page)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const getAllStudentsWorkOut2 = (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 0
  services.getAllStudents2(page)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const getSingleStudentsWorkOut = (req, res) => {
  services.getStudent(Number(req.params.id))
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const getProfessionWorkOut = (req, res) => {
  services.getPensum(Number(req.params.profession))
    .then((result: pensumNotFormat[]) => {
      const newFormat: pesumFormat[] = []
      const temp: number[] = []
      result.forEach((value: pensumNotFormat) => {
        const index = temp.indexOf(value.IdSemesters)
        if (index < 0) {
          newFormat.push({
            IdSemesters: value.IdSemesters,
            Name_Semesters: value.Name_Semesters,
            Classes: [
              {
                id: value.id,
                IdClasses: value.IdClasses,
                Name_Classes: value.Name_Classes
              }
            ]
          })
          temp.push(value.IdSemesters)
        } else {
          newFormat[index].Classes.push({
            id: value.id,
            IdClasses: value.IdClasses,
            Name_Classes: value.Name_Classes
          })
        }
      })
      res.status(200).json(newFormat)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const deleteTeachersWorkOut = (req, res) => {
  services.deleteMultipleTeacher(req.body)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const updateValueSingleTableWorkOut2 = (req, res) => {
  const table: string = req.path.slice(1)
  const id = validator.id(req.body)
  const data = table === 'students' ? validator[table](req.body) : validator[table]([req.body])[0]
  const dataValidated = { ...id, ...data }
  if (id && data) {
    services.updateSingle(table, dataValidated)
      .then(() => {
        res.status(200).json(true)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('updateValueSingleTableWorkOut2', 'Error en la estructura de datos')
    res.status(400).json({ erro: 'Error en la estructura de datos' })
  }
}

export const deleteStudentWorkOut = (req, res) => {
  const table: string = req.path.slice(1)
  const IdPersons = validator.IdPersons(req.body)
  services.deleteByIdPerson(table, IdPersons)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err })
    })
}

export const getScoresByIdStudent = (req, res) => {
  const id = validator.id({ id: Number(req.params.idStudents) })
  if (id) {
    services.getScoresByIdStudent(id.id)
      .then(result => res.status(200).json(result))
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('getScoresByIdStudent', 'Error en la estructura de datos')
    res.status(400).json({ erro: 'Error en la estructura de datos' })
  }
}

export const postScores = (req, res) => {
  const dataValidated: scores[] | false = validator.scores(req.body)
  if (dataValidated) {
    services.insertMultipleScores('scores', dataValidated)
      .then((result: any) => {
        const { insertId } = result
        res.status(200).json({ insertId })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('postScores', 'Error en la estructura de datos')
    res.status(400).json({ erro: 'Error en la estructura de datos' })
  }
}

export const updateScoresById = (req, res) => {
  const id = validator.id(req.body)
  const data = validator.scores([req.body])[0]
  const dataValidated = { ...id, ...data }
  if (id && data) {
    services.updateSingle('scores', dataValidated)
      .then(() => {
        res.status(200).json(true)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('updateScoresById', 'Error en la estructura de datos')
    res.status(400).json({ erro: 'Error en la estructura de datos' })
  }
}

export const getTeachersByProfessionAndSemesters = (req, res) => {
  const data = validator.professionAndSemesters(req.body)
  if (data) {
    const { IdProfession, IdSemesters } = data
    services.getTeachersByProfessionAndSemesters(IdProfession, IdSemesters)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('getTeachersByProfessionAndSemesters', 'Error en la estructura de datos')
    res.status(400).json({ erro: 'Error en la estructura de datos' })
  }
}

export const getClassesByProfessionAndSemesters = (req, res) => {
  const data = validator.professionAndSemesters(req.body)
  if (data) {
    const { IdProfession, IdSemesters } = data
    services.getClassesByProfessionAndSemesters(IdProfession, IdSemesters)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  } else {
    console.log('getTeachersByProfessionAndSemesters', 'Error en la estructura de datos')
    res.status(400).json({ erro: 'Error en la estructura de datos' })
  }
}

export const getStundentByIdPersonsWorkOut = (req, res) => {
  const IdPersons: number = Number(req.params.IdPersons)
  if (IdPersons) {
    services.getStudentsByIdPersons(IdPersons)
      .then(result => res.status(200).json(result))
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  }
}

export const getPersonByIdWorkOut = (req, res) => {
  const id = validator.id(req.body)
  if (id) {
    services.getPersonById(id)
      .then(result => res.status(200).json(result))
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
      })
  }
}

export const login = (req, res) => {
  const data = validator.login(req.body)
  if (data) {
    services.login(data)
      .then((result: any) => {
        const dotenv = require('dotenv')
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
        const token = jwt.sign(newData, SECRET)
        res.status(200).json({ token })
      })
      .catch(err => {
        console.log(err)
        res.status(401).json({ error: err })
      })
  }
}
