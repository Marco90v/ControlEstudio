import { oldFormat, scores, teacher } from '../types'

// La siguiente funcion, tranforma un arreglo de objesto en matriz.
// Ejemplo:
// ENTRADA:  ->  [ { "valor1":1, "valor2":2 } , {"valor1":3, "valor2":4} ]
// SALIDA:  ->  [ [1,2] , [3,4] ]
export const transformData = (datas: [] | scores[]): number[][] => {
  return datas.map(data => {
    return Object.keys(data).map(key => data[key])
  })
}

// tranforma un arreglo de objetos en un arrglo de objetos anidados/agrupados
export const transformTeacher = (result: oldFormat[]): teacher[] => {
  const newFormat: teacher[] = []
  const tempTeachers: number[] = []
  result.forEach((value: oldFormat) => {
    const indexTeacher: number = tempTeachers.indexOf(value.idPerson)
    if (indexTeacher < 0) {
      newFormat.push({
        idPerson: value.idPerson,
        name: value.names,
        lastNames: value.lastNames,
        sex: value.sex,
        email: value.email,
        phone: value.phone,
        photo: value.photo || '',
        profession: [{
          id: value.idProfession,
          name: value.profession,
          semesters: [{
            id: value.idSemester,
            name: value.semester,
            classe: [{
              id: value.idClasse,
              name: value.classe,
              shift: [{
                id: value.idShift,
                name: value.shift,
                section: [{
                  id: value.idSection,
                  name: value.section
                }]
              }]
            }]
          }]
        }]
      })
      tempTeachers.push(value.idPerson)
    } else {
      newFormat[indexTeacher].profession.forEach(profesion => {
        if (value.idProfession !== profesion.id) {
          newFormat[indexTeacher].profession.push({
            id: value.idProfession,
            name: value.profession,
            semesters: [{
              id: value.idSemester,
              name: value.semester,
              classe: [{
                id: value.idClasse,
                name: value.classe,
                shift: [{
                  id: value.idShift,
                  name: value.shift,
                  section: [{
                    id: value.idSection,
                    name: value.section
                  }]
                }]
              }]
            }]
          })
        } else {
          profesion.semesters.forEach(semester => {
            if (semester.id !== value.idSemester) {
              profesion.semesters.push({
                id: value.idSemester,
                name: value.semester,
                classe: [{
                  id: value.idClasse,
                  name: value.classe,
                  shift: [{
                    id: value.idShift,
                    name: value.shift,
                    section: [{
                      id: value.idSection,
                      name: value.section
                    }]
                  }]
                }]
              })
            } else {
              semester.classe.forEach(classe => {
                if (classe.id !== value.idClasse) {
                  semester.classe.push({
                    id: value.idClasse,
                    name: value.classe,
                    shift: [{
                      id: value.idShift,
                      name: value.shift,
                      section: [{
                        id: value.idSection,
                        name: value.section
                      }]
                    }]
                  })
                } else {
                  classe.shift.forEach(shift => {
                    if (shift.id !== value.idShift) {
                      classe.shift.push({
                        id: value.idShift,
                        name: value.shift,
                        section: [{
                          id: value.idSection,
                          name: value.section
                        }]
                      })
                    } else {
                      shift.section.forEach(section => {
                        if (section.id !== value.idSection) {
                          shift.section.push({
                            id: value.idSection,
                            name: value.section
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
  return newFormat
}
