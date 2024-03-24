import jwt from 'jsonwebtoken'
import * as services from '../services/index.js'
import dotenv from "dotenv"
import { login } from '../controllers/index.js';
import { validator } from '../controllers/validator.js';
import { INSERT_LISTCOLUMN, NAMETABLE, UPDATE_LISTVALUES } from '../utils/const.js';
import { pensumNotFormat, pensumFormat } from '../types/index.js';
import { authorization } from '../controllers/validateToken.js';
import { GraphQLError } from 'graphql';

dotenv.config()

const validatePermissions = (path:string, method:string, rol:number, callback:Function) => {
    const permissions = authorization.find(e => e.ruta === path && e.method === method && e.role.find(y => y === rol))
    if(permissions){
        return callback()
    }else{
        throw new GraphQLError('Acción no autorizada',{
            extensions:{
                code:'UNAUTHENTICATED',
                http: {status:403}
            }
        })
    }
}

const errorPermissions = () => {
    throw new GraphQLError('Acción no autorizada',{
        extensions:{
            code:'UNAUTHENTICATED',
            http: {status:403}
        }
    })
}

const addData = (args, table:string) => {
    console.log(table, args)
    return new Promise(async (resolve, reject)=>{
        const data = validator[table](args)
        if(data){
            const res:any = await services.insertSingle(table,data).catch(error=>{return { error }})
            const { insertId } = res
            if(insertId){
                resolve({
                    id: insertId,
                    ...args
                })
            }
            reject(null)
        }
        reject(null)
    })
}

const updateData = (args, table:string) => {
    return new Promise( async (resolve, reject)=>{
        const id = validator.id(args)
        const data = validator[table](args)
        const dataValidated = { ...id, ...data }
        if(id && data){
                const res:any = await services.updateSingle(table,dataValidated).catch(error=>{return { error }})
                if(res.affectedRows){
                    resolve({
                        ...id,
                        ...dataValidated
                    })
                }
                reject(null)
            }
            reject(null)
    })
}

const deleteData = (args, table:string) => {
    return new Promise( async (resolve, reject)=>{
        const dataValidated = validator.id(args)
        if(dataValidated){
            const res:any = await services.deleteSingle(table, dataValidated).catch(error=>{return { error }})
            if(res.affectedRows){
                resolve(dataValidated.id)
            }
            reject(false)
        }
        reject(false)
    })
}

const addMultData = (args, insertListColumn, table:string) => {
    return new Promise(async (resolve, reject)=>{
        const data = validator[table](args)
        if(data){
            const res:any =  await services.insertMult(
                table,
                insertListColumn,
                data
            )
            .catch(error=>{return { error }})
            const { insertId } = res
            if(insertId){
                resolve(true)
            }
            reject(false)
        }
        reject(null)
    })
}

const updateMultData = (args, insertListColumn, updateListValues, table:string) => {
    return new Promise(async (resolve, reject)=>{
        const data = validator[table](args)
        if(data){
            const res:any =  await services.updateMult(
                table,
                insertListColumn,
                updateListValues,
                data
            )
            .catch(error=>{
                return { error }}
            )
            const { insertId, affectedRows } = res
            if(insertId || affectedRows){
                resolve(true)
            }
            reject(false)
        }
        reject(null)
    })
}

const deleteMultData = (args, table:string) => {
    return new Promise(async (resolve, reject)=>{
        const data: number[] | false = validator.ids(args)
        if(data){
            const res:any =  await services.deleteMult(table,data).catch(error=>{return { error }})
            const { affectedRows } = res
            if(affectedRows){
                resolve(true)
            }
            reject(false)
        }
        reject(null)
    })
}

const resolvers = {
    Query: {
        __type() {
            throw new Error('You cannot make introspection');
        },
        __schema() {
            throw new Error('You cannot make introspection');
        },
        // LOGIN
        login: async(_,args, contextValue)=>{
            const {user, pass} = args
            const data = await login(user, pass)
            if(data){
                const SECRET = process.env.SECRET
                const token = jwt.sign(data, SECRET)
                return {token}
            }
            return null
        },
        // ADMIN
        allAdmin : async (_,args, contextValue) =>{
            // const role = contextValue.role
            return await services.getAllAdmin().catch(error=>{return { error }})
        },
        // CLASSES
        allClasses: async (_,args, contextValue) =>{
            const callback = async () => await services.getAll(NAMETABLE.classes).catch(error=>{return { error }})
            return validatePermissions("classes", "GET", contextValue.role, callback)
        },
        // SEMESTERS
        allSemesters: async (_,args, contextValue) => {
            const callback = async () => await services.getAll(NAMETABLE.semesters).catch(error=>{return { error }})
            return validatePermissions("semesters", "GET", contextValue.role, callback)
        },
        // PROFESSION
        allProfession: async (_,args, contextValue) => {
            const callback = async () => await services.getAll(NAMETABLE.profession).catch(error=>{return { error }})
            return validatePermissions("profession", "GET", contextValue.role, callback)
        },
        // SHIFTS
        allShifts: async (_,args, contextValue) => {
            const callback = async () => await services.getAll(NAMETABLE.shifts).catch(error=>{return { error }})
            return validatePermissions("shifts", "GET", contextValue.role, callback)
        },
        // SECTION
        allSections: async (_,args, contextValue) => {
            const callback = async () => await services.getAll(NAMETABLE.sections).catch(error=>{return { error }})
            return validatePermissions("sections", "GET", contextValue.role, callback)
        },
        // ROLE
        allRoles: async (_,args, contextValue) => {
            const callback = async () => await services.getAll(NAMETABLE.roles).catch(error=>{return { error }})
            return validatePermissions("roles", "GET", contextValue.role, callback)
        },
        // PERSON
        allPersons: async (_,args, contextValue) => {
            const callback = async () => await services.getAll(NAMETABLE.persons).catch(error=>{return { error }})
            return validatePermissions("persons", "GET", contextValue.role, callback)
        },
        getPersonById: async (_,args, contextValue) => {
            const id = validator.id(args)
            if (id) return await services.getById(NAMETABLE.persons,id).catch(error=>{return { error }})
            return null
        },
        getPersonByRole: async (_,{role}, contextValue) => {
            return await services.getPersonByRole(role).catch(error=>{return { error }})
        },
        // TEACHER
        getTeachers: async (_,args, contextValue) => {
            const callback = async () => await services.getAllTeachers2().catch(error=>{return { error }})
            return validatePermissions("teachers", "GET", contextValue.role, callback)
        },
        getTeacherByPerson: async (_,{id}, contextValue) => {
            const idTeacher: number = Number(id)
            const res  = await services.getTeacher2(idTeacher).catch(error=>{return { error }})
            return res
        },
        // STUDENTS
        getStudents: async (_,args, contextValue) => {
            const callback = async () => await services.getAll(NAMETABLE.students).catch(error=>{return { error }})
            return validatePermissions("students", "GET", contextValue.role, callback)
        },
        getStudentsByPerson: async (_,args, contextValue) => {
            const IdPersons = validator.IdPersons(args)
            if (IdPersons){
                return await services.getStudentsByIdPersons(IdPersons.idPersons).catch(error=>{return { error }})
            }else{
                return null
            }
        },
        // SCORES
        getScores: async (_, args, contextValue) => {
            const id = validator.id({ id: Number(args.idStudents) })
            if(id){
                const callback = async () => await services.getScoresByIdStudent(id.id).catch(error=>{return { error }})
                return validatePermissions("scores", "GET", contextValue.role, callback)
            }else{
                return null
            }

        },
        getClassesByProfessionAndSemesters: async (_, {ProfessionAndSemesters}, contextValue) => {
            const data = validator.professionAndSemesters(ProfessionAndSemesters)
            if (data){
                const { IdProfession, IdSemesters } = data
                // return await services.getClassesByProfessionAndSemesters(IdProfession, IdSemesters).catch(error=>{return { error }})

                const callback = async () => await services.getClassesByProfessionAndSemesters(IdProfession, IdSemesters).catch(error=>{return { error }})
                return validatePermissions("getClassesByProfessionAndSemesters", "POST", contextValue.role, callback)
            }

        },
        getTeachersByProfessionAndSemesters: async (_, {ProfessionAndSemesters}, contextValue) => {
            const data = validator.professionAndSemesters(ProfessionAndSemesters)
            if(data){
                const { IdProfession, IdSemesters } = data
                // return await services.getTeachersByProfessionAndSemesters(IdProfession, IdSemesters).catch(error=>{return { error }})
                const callback = async () => await services.getTeachersByProfessionAndSemesters(IdProfession, IdSemesters).catch(error=>{return { error }})
                return validatePermissions("getTeachersByProfessionAndSemesters", "POST", contextValue.role, callback)
            }
        },
        getProfile: async (_, args, contextValue) => {
            return contextValue
        },
        getPensumById: async (_, args, contextValue) => {
            const callback = async () => {
                const pensumNotFormat:pensumNotFormat[] | any = await services.getPensum(args.id).catch(error=>{return { error }})
                // console.log(pensumNotFormat)
                const pensumFormat:pensumFormat[] = []
                const temp: number[] = []
                pensumNotFormat.forEach((value: pensumNotFormat) => {
                    const index = temp.indexOf(value.IdSemesters)
                    if (index < 0) {
                        pensumFormat.push({
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
                        pensumFormat[index].Classes.push({
                        id: value.id,
                        IdClasses: value.IdClasses,
                        Name_Classes: value.Name_Classes
                    })
                    }
                })
                // console.log(pensumFormat)
                return pensumFormat
            }
            return validatePermissions("pensum", "GET", contextValue.role, callback)
        },
    },
    Mutation: {
        // CLASSES
        addClasses: async (_,{dataClasse}, contextValue) => {
            const callback = async () => await addData(dataClasse,NAMETABLE.classes)
            return validatePermissions("classes", "POST", contextValue.role, callback)
        },
        updateClasses: async (_,{dataClasse}, contextValue) => {
            const callback = async () => await updateData(dataClasse,NAMETABLE.classes)
            return validatePermissions("classes", "PUT", contextValue.role, callback)
        },
        deleteClasses: async (_,args, contextValue) => {
            const callback = async () => await deleteData(args,NAMETABLE.classes)
            return validatePermissions("classes", "DELETE", contextValue.role, callback)
        },
        // SEMESTERS
        addSemester: async (_,{dataSemester}, contextValue) => {
            const callback = async () => await addData(dataSemester,NAMETABLE.semesters)
            return validatePermissions("semesters", "POST", contextValue.role, callback)
        },
        updateSemester: async (_,{dataSemester}, contextValue) => {
            const callback = async () => await updateData(dataSemester,NAMETABLE.semesters)
            return validatePermissions("semesters", "PUT", contextValue.role, callback)
        },
        deleteSemester: async (_,args, contextValue) => {
            const callback = async () => await deleteData(args,NAMETABLE.semesters)
            return validatePermissions("semesters", "DELETE", contextValue.role, callback)
        },
        // PROFESSION
        addProfession: async (_,{dataProfession}, contextValue) => {
            const callback = async () => await addData(dataProfession,NAMETABLE.profession)
            return validatePermissions("profession", "POST", contextValue.role, callback)
        },
        updateProfession: async (_,{dataProfession}, contextValue) => {
            const callback = async () => await updateData(dataProfession,NAMETABLE.profession)
            return validatePermissions("profession", "PUT", contextValue.role, callback)
        },
        deleteProfession: async (_,args, contextValue) => {
            const callback = async () => await deleteData(args,NAMETABLE.profession)
            return validatePermissions("profession", "DELETE", contextValue.role, callback)
        },
        // SHIFTS
        addShift: async (_,{dataShift}, contextValue) => {
            const callback = async () => await addData(dataShift,NAMETABLE.shifts)
            return validatePermissions("shifts", "POST", contextValue.role, callback)
        },
        updateShift: async (_,{dataShift}, contextValue) => {
            const callback = async () => await updateData(dataShift,NAMETABLE.shifts)
            return validatePermissions("shifts", "PUT", contextValue.role, callback)
        },
        deleteShift: async (_,args, contextValue) => {
            const callback = async () => await deleteData(args,NAMETABLE.shifts)
            return validatePermissions("shifts", "DELETE", contextValue.role, callback)
        },
        // SECTION
        addSection: async (_,{dataSection}, contextValue) => {
            const callback = async () => await addData(dataSection,NAMETABLE.sections)
            return validatePermissions("sections", "POST", contextValue.role, callback)
        },
        updateSection: async (_,{dataSection}, contextValue) => {
            const callback = async () => await updateData(dataSection,NAMETABLE.sections)
            return validatePermissions("sections", "PUT", contextValue.role, callback)
        },
        deleteSection: async (_,args, contextValue) => {
            const callback = async () => await deleteData(args,NAMETABLE.sections)
            return validatePermissions("sections", "DELETE", contextValue.role, callback)
        },
        // ROLES
        addRole: async (_,{dataRole}, contextValue) => {
            const callback = async () => await addData(dataRole,NAMETABLE.roles)
            return validatePermissions("roles", "POST", contextValue.role, callback)
        },
        updateRole: async (_,{dataRole}, contextValue) => {
            const callback = async () => await updateData(dataRole,NAMETABLE.roles)
            return validatePermissions("roles", "PUT", contextValue.role, callback)
        },
        deleteRole: async (_,args, contextValue) => {
            const callback = async () => await deleteData(args,NAMETABLE.roles)
            return validatePermissions("roles", "DELETE", contextValue.role, callback)
        },
        // PERSON
        addPerson: async (_,{dataPerson}, contextValue) => {
            const callback = async () => await addData(dataPerson,NAMETABLE.persons)
            return validatePermissions("persons", "POST", contextValue.role, callback)
        },
        updatePerson: async (_,{dataPerson}, contextValue) => {
            const callback = async () => await updateData(dataPerson,NAMETABLE.persons)
            return validatePermissions("persons", "PUT", contextValue.role, callback)
        },
        deletePerson: async (_,args, contextValue) => {
            const callback = async () => await deleteData(args,NAMETABLE.persons)
            return validatePermissions("persons", "DELETE", contextValue.role, callback)
        },
        // TEACHER
        addTeacher: async (_,{dataTeacher}, contextValue) => {
            const callback = async () => await addMultData(dataTeacher,INSERT_LISTCOLUMN.teacher, NAMETABLE.teachers)
            return validatePermissions("teachers", "POST", contextValue.role, callback)
        },
        updateTeacher: async (_,{dataTeacher}, contextValue) => {
            const callback = async () => await updateMultData(dataTeacher,INSERT_LISTCOLUMN.teacher,UPDATE_LISTVALUES.teacher,NAMETABLE.teachers)
            return validatePermissions("teachers", "PUT", contextValue.role, callback)
        },
        deleteTeacher: async (_,{ids}, contextValue) => {
            const callback = async () => await deleteMultData(ids,NAMETABLE.teachers)
            return validatePermissions("teachers", "DELETE", contextValue.role, callback)
        },
        deleteTeacherByIdPerson: async (_,args, contextValue) => {
            const dataValidated = validator.IdPersons(args)
            if(dataValidated){
                const callback = async () => await services.deleteByIdPerson(NAMETABLE.teachers, dataValidated)
                .then(() => true).catch(err => null)
                return validatePermissions("teachersDelete", "DELETE", contextValue.role, callback)
            }else{
                return null
            }
        },
        // STUDENTS
        addStudents: async (_,{dataStudent}, contextValue) => {
            const callback = async () => await addData(dataStudent,NAMETABLE.students)
            return validatePermissions("students", "POST", contextValue.role, callback)
        },
        updateStudent: async (_,{dataStudent}, contextValue) => {
            const callback = async () => await updateData(dataStudent,NAMETABLE.students)
            return validatePermissions("students", "PUT", contextValue.role, callback)
        },
        deleteStudentByIdPerson: async (_,args, contextValue) => {
            const dataValidated = validator.IdPersons(args)
            if(dataValidated){
                const callback = async () => await services.deleteByIdPerson(NAMETABLE.students, dataValidated)
                .then(() => true).catch(err => null)
                return validatePermissions("students", "DELETE", contextValue.role, callback)
            }else{
                return null
            }
        },
        // SCORE
        addScore: async (_, {dataScores}, contextValue) => {
            const callback = async () => await addMultData(dataScores, INSERT_LISTCOLUMN.scores, NAMETABLE.scores)
            .then(() => true).catch(err => null)
            return validatePermissions("scores", "POST", contextValue.role, callback)
        },
        updateScore: async(_, {dataScores}, contextValue) => {
            const callback = async () => await updateMultData(dataScores, INSERT_LISTCOLUMN.scores, UPDATE_LISTVALUES.scores, NAMETABLE.scores)
            return validatePermissions("scores", "PUT", contextValue.role, callback)
        },
        // PENSUM
        addClassesPensum: async (_, {DataPensum}, contextValue) => {
            const callback = async () => await addMultData(DataPensum.body, INSERT_LISTCOLUMN.pensum, NAMETABLE.pensum)
            .then(() => true).catch(err => null)
            return validatePermissions("pensum", "POST", contextValue.role, callback)
        },
        deleteClassePensum: async (_, args, contextValue) => {
            const callback = async () => await deleteData(args, NAMETABLE.pensum)
            .then(() => true).catch(err => null)
            return validatePermissions("pensum", "DELETE", contextValue.role, callback)
        },
    }
  };

export default resolvers