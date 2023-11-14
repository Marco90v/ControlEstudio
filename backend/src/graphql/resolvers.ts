import jwt from 'jsonwebtoken'
// import * as services from "../services/index.js"
import * as services from '../services/index.js'
import dotenv from "dotenv"
import { login } from '../controllers/index.js';
import { validator } from '../controllers/validator.js';
import { INSERT_LISTCOLUMN, NAMETABLE, UPDATE_LISTVALUES } from '../utils/const.js';
// import { rejects } from 'assert';

dotenv.config()

const addData = (args, table:string) => {
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
                resolve(true)
            }
            reject(false)
        }
        reject(false)
    })
}

const addMultData = (args, table:string) => {
    return new Promise(async (resolve, reject)=>{
        const data = validator[table](args)
        if(data){
            const res:any =  await services.insertMult(
                table,
                INSERT_LISTCOLUMN.teacher,
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

const updateMultData = (args, table:string) => {
    return new Promise(async (resolve, reject)=>{
        const data = validator[table](args)
        if(data){
            const res:any =  await services.updateMult(
                table,
                INSERT_LISTCOLUMN.teacher,
                UPDATE_LISTVALUES.teacher,
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
        login: async(_,args)=>{
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
            return await services.getAll(NAMETABLE.classes).catch(error=>{return { error }})
        },
        // SEMESTERS
        allSemesters: async (_,args, contextValue) => {
            return await services.getAll(NAMETABLE.semesters).catch(error=>{return { error }})
        },
        // PROFESSION
        allProfession: async (_,args, contextValue) => {
            return await services.getAll(NAMETABLE.profession).catch(error=>{return { error }})
        },
        // SHIFTS
        allShifts: async (_,args, contextValue) => {
            return await services.getAll(NAMETABLE.shifts).catch(error=>{return { error }})
        },
        // SECTION
        allSections: async (_,args, contextValue) => {
            return await services.getAll(NAMETABLE.sections).catch(error=>{return { error }})
        },
        // ROLE
        allRoles: async (_,args, contextValue) => {
            return await services.getAll(NAMETABLE.roles).catch(error=>{return { error }})
        },
        // PERSON
        allPersons: async (_,args, contextValue) => {
            return await services.getAll(NAMETABLE.persons).catch(error=>{return { error }})
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
            return await services.getAllTeachers2().catch(error=>{return { error }})
        },
        getTeacherByPerson: async (_,{id}, contextValue) => {
            const idTeacher: number = Number(id)
            const res = await services.getTeacher2(idTeacher).catch(error=>{return { error }})
            return res[0]
        },
    },
    Mutation: {
        // CLASSES
        addClasses: async (_,{dataClasse}, contextValue) => await addData(dataClasse,NAMETABLE.classes),
        updateClasses: async (_,{dataClasse}, contextValue) => await updateData(dataClasse,NAMETABLE.classes),
        deleteClasses: async (_,args, contextValue) => await deleteData(args,NAMETABLE.classes),
        // SEMESTERS
        addSemester: async (_,{dataSemester}, contextValue) => await addData(dataSemester,NAMETABLE.semesters),
        updateSemester: async (_,{dataSemester}, contextValue) => await updateData(dataSemester,NAMETABLE.semesters),
        deleteSemester: async (_,args, contextValue) => await deleteData(args,NAMETABLE.semesters),
        // PROFESSION
        addProfession: async (_,{dataProfession}, contextValue) => await addData(dataProfession,NAMETABLE.profession),
        updateProfession: async (_,{dataProfession}, contextValue) => await updateData(dataProfession,NAMETABLE.profession),
        deleteProfession: async (_,args, contextValue) => await deleteData(args,NAMETABLE.profession),
        // SHIFTS
        addShift: async (_,{dataShift}, contextValue) => await addData(dataShift,NAMETABLE.shifts),
        updateShift: async (_,{dataShift}, contextValue) => await updateData(dataShift,NAMETABLE.shifts),
        deleteShift: async (_,args, contextValue) => await deleteData(args,NAMETABLE.shifts),
        // SECTION
        addSection: async (_,{dataSection}, contextValue) => await addData(dataSection,NAMETABLE.sections),
        updateSection: async (_,{dataSection}, contextValue) => await updateData(dataSection,NAMETABLE.sections),
        deleteSection: async (_,args, contextValue) => await deleteData(args,NAMETABLE.sections),
        // ROLES
        addRole: async (_,{dataRole}, contextValue) => await addData(dataRole,NAMETABLE.roles),
        updateRole: async (_,{dataRole}, contextValue) => await updateData(dataRole,NAMETABLE.roles),
        deleteRole: async (_,args, contextValue) => await deleteData(args,NAMETABLE.roles),
        // PERSON
        addPerson: async (_,{dataPerson}, contextValue) => await addData(dataPerson,NAMETABLE.persons),
        updatePerson: async (_,{dataPerson}, contextValue) => await updateData(dataPerson,NAMETABLE.persons),
        deletePerson: async (_,args, contextValue) => await deleteData(args,NAMETABLE.persons),
        // TEACHER
        addTeacher: async (_,{dataTeacher}, contextValue) => await addMultData(dataTeacher, NAMETABLE.teachers),
        updateTeacher: async (_,{dataTeacher}, contextValue) => await updateMultData(dataTeacher,NAMETABLE.teachers),
        deleteTeacher: async (_,{ids}, contextValue) => await deleteMultData(ids,NAMETABLE.teachers),
    }
  };

export default resolvers