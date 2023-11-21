// import {  PoolConnection } from 'mysql2';
import { transformData } from '../transform/index.js'
import { allStudents, dbPersons, scores } from '../types/index.js'
import { conn } from './conect.js'

export const getAllAdmin = async () => {
  return await new Promise(async (resolve, reject) => {
    const query = 'SELECT \
            admin.id AS "IdAdmin", \
            admin.IdPersons AS "IdPerson", \
            persons.names, \
            persons.lastNames, \
            persons.sex, \
            persons.email, \
            persons.phone, \
            persons.photo \
            FROM admin \
            INNER JOIN persons ON persons.id = admin.IdPersons;'
    conn.query(query, (err, result) => {
      if (err) reject(`Error en consulta Admin: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getAll = async (table: string) => {
  return await new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table}`
    conn.query(query, (err, result) => {
      if (err) reject(`Error en consulta a tabla ${table}: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getPerson = async (id: number) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT * FROM persons WHERE id = ?'
    conn.query(query, id, (err, result) => {
      if (err) reject(`Error en consulta a tabla Persons: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const insertSingle = async (table, data) => {
  return await new Promise((resolve, reject) => {
    const query = `INSERT INTO ${table} set ?`
    conn.query(query, data, (err, result) => {
      if (err) reject(`Error en consulta a tabla ${table}: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const updateSingle = async (table, data) => {
  return await new Promise((resolve, reject) => {
    const { id, ...d } = data
    const query = `UPDATE ${table} set ? where id = ?`
    conn.query(query, [d, id], (err, result) => {
      if (err) reject(`Error en consulta a tabla ${table}: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const deleteSingle = async (table, data) => {
  return await new Promise((resolve, reject) => {
    const query = `DELETE FROM ${table} WHERE id = ?`
    conn.query(query, data.id, (err, result) => {
      if (err) reject(`Error al eliminar id=${data.id} en la tabla ${table}: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const deleteByIdPerson = async (table, data) => {
  return await new Promise((resolve, reject) => {
    const query = `DELETE FROM ${table} WHERE IdPersons = ?`
    conn.query(query, data.idPersons, (err, result) => {
      if (err) reject(`Error al eliminar id=${data.id} en la tabla ${table}: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const insertMultiple = async (table: string, datas: []) => {
  return await new Promise((resolve, reject) => {
    const newData = transformData(datas)
    const query = `INSERT INTO ${table} (IdProfession,IdSemesters,IdClasses) VALUES ?`
    conn.query(query, [newData], (err, result) => {
      if (err) reject(`Error en consulta a tabla ${table}: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const insertMult = async (table: string, insertListColumn:string, datas: []) => {
  return await new Promise((resolve, reject) => {
    const newData = transformData(datas)
    const query = `INSERT INTO ${table} (${insertListColumn}) VALUES ?`
    conn.query(query, [newData], (err, result) => {
      if (err) reject(`Error en consulta a tabla ${table}: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const updateMult = async (table: string, insertListColumn:string, updateListValue:string, datas: []) => {
  return await new Promise((resolve, reject) => {
    const newData = transformData(datas)
    const query = `INSERT INTO ${table} (id,${insertListColumn}) VALUES ? ON DUPLICATE KEY UPDATE ${updateListValue}`
    conn.query(query, [newData], (err, result) => {
      if (err) reject(`Error en consulta a tabla ${table}: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const insertMultipleTeacher = async (table: string, datas: []) => {
  return await new Promise((resolve, reject) => {
    const newData = transformData(datas)
    const query = `INSERT INTO ${table} (IdPersons,IdProfession,IdSemesters,IdClasses,IdShifts,IdSections) VALUES ?`
    conn.query(query, [newData], (err, result) => {
      if (err) reject(`Error en consulta a tabla ${table}: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getPensum = async (id: number) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT pensum.id, \
            semesters.id AS "IdSemesters", \
            semesters.names AS "Name_Semesters", \
            classes.id AS "IdClasses", \
            classes.names AS "Name_Classes" \
            FROM classes \
            INNER JOIN pensum ON classes.id = pensum.IdClasses \
            INNER JOIN semesters ON pensum.IdSemesters = semesters.id \
            WHERE pensum.IdProfession = ?'
    conn.query(query, id, (err, result) => {
      if (err) reject(`Error en consulta Pensum: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getAllStudents = async (page: number = 0) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) as "totalStudents" FROM students;'
    conn.query(query, (err, result) => {
      if (err) {
        reject(`Error en consulta Pensum: ${err}`)
        return
      }
      const totalStudents = result[0].totalStudents
      let data: allStudents = {
        totalStudents,
        currentPage: page,
        totalPages: Math.ceil(totalStudents / 20),
        students: []
      }
      const query2 = 'SELECT students.id AS "IdStudent", \
                persons.names, \
                persons.lastNames, \
                persons.sex, \
                persons.email, \
                persons.phone, \
                profession.names  AS "profession", \
                semesters.names AS "semester" \
                FROM students \
                INNER JOIN persons ON students.IdPersons = persons.id \
                INNER JOIN profession ON students.IdProfession = profession.id \
                INNER JOIN semesters ON students.IdSemesters = semesters.id \
                LIMIT ?,20;'
      conn.query(query2, page, (err2, result2) => {
        if (err2) reject(`Error en consulta Pensum: ${err}`)
        if (result2) {
          data = {
            ...data,
            students: result2[0]
          }
          resolve(data)
        }
      })
    })
  })
}

export const getAllStudents2 = async (page: number = 0) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT * FROM students'
    conn.query(query, (err, result) => {
      if (err) reject(`Error en consulta paginacion Students: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getStudent = async (id: number) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT students.id AS "IdStudent", \
            persons.names, \
            persons.lastNames, \
            persons.sex, \
            persons.email, \
            persons.phone, \
            profession.names  AS "profession", \
            semesters.names AS "semester" \
            FROM students \
            INNER JOIN persons ON students.IdPersons = persons.id \
            INNER JOIN profession ON students.IdProfession = profession.id \
            INNER JOIN semesters ON students.IdSemesters = semesters.id \
            WHERE students.id = ?;'
    conn.query(query, id, (err, result) => {
      if (err) reject(`Error en consulta detallada Students: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getAllTeachers = async (page: number = 0) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT \
            teachers.IdPersons AS "idPerson", \
            persons.names, \
            persons.lastNames, \
            persons.sex, \
            persons.email, \
            persons.phone, \
            persons.photo, \
            profession.id AS "idProfession", \
            profession.names AS "profession", \
            semesters.id AS "idSemester", \
            semesters.names AS "semester", \
            classes.id AS "idClasse", \
            classes.names AS "classe", \
            shifts.id AS "idShift", \
            shifts.names AS "shift", \
            sections.id AS "idSection", \
            sections.names AS "section" \
            FROM teachers \
            INNER JOIN persons ON teachers.IdPersons = persons.id \
            INNER JOIN profession ON teachers.IdProfession = profession.id \
            INNER JOIN semesters ON teachers.IdSemesters = semesters.id \
            INNER JOIN classes ON teachers.IdClasses = classes.id \
            INNER JOIN shifts ON teachers.IdShifts = shifts.id \
            INNER JOIN sections on teachers.IdSections = sections.id'
    conn.query(query, page, (err, result) => {
      if (err) reject(`Error en consulta detallada teachers: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getAllTeachers2 = async () => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT * FROM teachers'
    conn.query(query, (err, result) => {
      if (err) reject(`Error en consulta detallada teachers: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getTeacher = async (id: number) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT \
            teachers.IdPersons AS "idPerson", \
            persons.names, \
            persons.lastNames, \
            persons.sex, \
            persons.email, \
            persons.phone, \
            persons.photo, \
            profession.id AS "idProfession", \
            profession.names AS "profession", \
            semesters.id AS "idSemester", \
            semesters.names AS "semester", \
            classes.id AS "idClasse", \
            classes.names AS "classe", \
            shifts.id AS "idShift", \
            shifts.names AS "shift", \
            sections.id AS "idSection", \
            sections.names AS "section" \
            FROM teachers \
            INNER JOIN persons ON teachers.IdPersons = persons.id \
            INNER JOIN profession ON teachers.IdProfession = profession.id \
            INNER JOIN semesters ON teachers.IdSemesters = semesters.id \
            INNER JOIN classes ON teachers.IdClasses = classes.id \
            INNER JOIN shifts ON teachers.IdShifts = shifts.id \
            INNER JOIN sections on teachers.IdSections = sections.id \
            WHERE teachers.IdPersons = ? '
    conn.query(query, id, (err, result) => {
      if (err) reject(`Error en consulta detallada teachers: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getTeacher2 = async (id: number)=> {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT * FROM teachers WHERE IdPersons = ?'
    conn.query(query, id, (err, result) => {
      if (err) reject(`Error en consulta detallada teachers: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getPersonByRole = async (role: number) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT * FROM persons WHERE role=?;'
    conn.query(query, role, (err, result) => {
      if (err) reject(`Error en consulta detallada personByRole: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const updatePerson = async (dataPerson: dbPersons) => {
  const { names, lastNames, sex, email, phone, photo, role, id } = dataPerson
  return await new Promise((resolve, reject) => {
    const query = `UPDATE persons SET names='${names}',lastNames='${lastNames}', sex='${sex}', email='${email}', phone=${phone}, photo='${photo}' WHERE id=${id}`
    conn.query(query, (err, result) => {
      if (err) reject(`Error al actualizar datos, updatePerson: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const deleteMultipleTeacher = async (ids: number[]) => {
  return await new Promise((resolve, reject) => {
    const query = 'DELETE FROM teachers WHERE id IN (?)'
    conn.query(query, [ids], (err, result) => {
      if (err) reject(`Error eliminar datos, deleteMultipleTeacher: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const deleteMult = async (table, ids: number[]) => {
  return await new Promise((resolve, reject) => {
    const query = `DELETE FROM ${table} WHERE id IN (?)`
    conn.query(query, [ids], (err, result) => {
      if (err) reject(`Error eliminar datos, deleteMultipleTeacher: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const updateDataTeacher = async (data: any) => {
  return await new Promise((resolve, reject) => {
    const query = 'UPDATE teachers set ? where id = ?'
    conn.query(query, [data], (err, result) => {
      if (err) reject(`Error eliminar datos, updateDataTeacher: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getScoresByIdStudent = async (data: number) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT * FROM scores where IdStudents = ?'
    conn.query(query, data, (err, result) => {
      if (err) reject(`Error recuperar datos, getScoresByIdStudent: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const insertMultipleScores = async (table: string, scores: scores[]) => {
  return await new Promise((resolve, reject) => {
    const newData = transformData(scores)
    const query = `INSERT INTO ${table} (IdStudents,IdClasses,IdTeachers,IdShifts,IdSections,score) VALUES ?`
    conn.query(query, [newData], (err, result) => {
      if (err) reject(`Error en consulta a tabla ${table}: ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getTeachersByProfessionAndSemesters = async (IdProfession: number, IdSemesters: number) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT \
            teachers.id, \
            teachers.IdPersons, \
            persons.names, \
            persons.lastNames, \
            teachers.IdClasses, \
            teachers.IdShifts, \
            teachers.IdSections \
            FROM teachers \
            INNER JOIN persons ON teachers.IdPersons = persons.id \
            WHERE IdProfession = ? AND IdSemesters = ?\
            ORDER BY IdPersons, IdClasses'
    conn.query(query, [IdProfession, IdSemesters], (err, result) => {
      if (err) reject(`Error en consulta a tabla teachers(getTeachersByProfessionAndSemesters): ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getClassesByProfessionAndSemesters = async (IdProfession: number, IdSemesters: number) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT \
            pensum.IdClasses as id, \
            classes.names \
            FROM pensum \
            INNER JOIN classes ON classes.id = pensum.IdClasses \
            WHERE IdProfession = ? AND IdSemesters = ? \
            ORDER BY IdClasses'
    conn.query(query, [IdProfession, IdSemesters], (err, result) => {
      if (err) reject(`Error en consulta a tabla pemsun(getTeachersByProfessionAndSemesters): ${err}`)
      if (result) resolve(result)
    })
  })
}

export const getStudentsByIdPersons = async (IdPersons: number) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT * FROM students WHERE IdPersons = ?'
    conn.query(query, IdPersons, (err, result) => {
      if (err) reject(`Error en consulta a tabla students(getStudentsById): ${err}`)
      if (result) resolve(result[0])
    })
  })
}

export const login = async ({ user, pass }: { user: string, pass: string }) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT persons.names, \
            persons.id, \
            persons.lastNames, \
            persons.sex, \
            persons.email, \
            persons.phone, \
            persons.photo, \
            persons.role \
            FROM login \
            INNER JOIN persons on persons.id = login.IdPersons \
            WHERE user = ? and pass = ?'
    conn.query(query, [user, pass], (err, result) => {
      if (err) reject(`Error en consulta a tabla login: ${err}`)
      if (result) resolve(result[0])
    })
  })
}

export const getPersonById = async ({ id }) => {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT * FROM persons WHERE id = ?'
    conn.query(query, id, (err, result) => {
      if (err) reject(`Error en consulta a tabla login: ${err}`)
      if (result) resolve(result[0])
    })
  })
}

export const getById = async (table: string,{ id }) => {
  return await new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table} WHERE id = ?`
    conn.query(query, id, (err, result) => {
      if (err) reject(`Error en consulta a tabla login: ${err}`)
      if (result) resolve(result[0])
    })
  })
}
