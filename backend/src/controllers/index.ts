import * as services from "../services";
import { transformTeacher } from "../transform";
import { oldFormat, pensumNotFormat, pesumFormat } from "../types";
import { validator } from "./validator";

export const getAllAdminWorkOut = (_,res) => {
    services.getAllAdmin()
        .then(resolve=>res.status(200).json(resolve))
        .catch(err => {
            console.log(err);
            res.status(400).json({error:err});
        });
}

export const getAllWorkOut = (req,res) => {
    const table:string = req.path.slice(1);
    services.getAll(table)
        .then(resolve=>res.status(200).json(resolve))
        .catch(err => {
            console.log(err);
            res.status(400).json({error:err});
        });
}

export const setValuesSingleTableWorkOut = (req,res) => {
    const table:string = req.path.slice(1);
    const dataValidated = validator[table](req.body);
    if(dataValidated){
        services.insertSingle(table,dataValidated)
            .then((result:any)=>{
                const {insertId} = result;
                res.status(200).json({insertId})
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({error:err});
            });
    }else{
        console.log("setValuesSingleTableWorkOut", "Error en la estructura de datos");
        res.status(400).json({error:"Error en la estructura de datos"});
    }
}

export const updateValueSingleTableWorkOut = (req,res) => {
    const table:string = req.path.slice(1);
    const id = validator.id(req.body);
    const data = validator[table](req.body);
    const dataValidated = {...id, ...data}
    if(id && data){
        services.updateSingle(table,dataValidated)
            .then(()=>{
                res.status(200).json(true)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({error:err});
            });
    }else{
        console.log("updateValueSingleTableWorkOut", "Error en la estructura de datos");
        res.status(400).json({erro:"Error en la estructura de datos"});
    }
}

export const deleteValueSingleTableWorkOut = (req,res) => {
    const table:string = req.path.slice(1);
    const dataValidated = validator.id(req.body);
    if(dataValidated){
        services.deleteSingle(table,dataValidated)
            .then(()=>{
                res.status(200).json({deleteId : req.body.id})
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({error:err});
            });
    }else{
        console.log("deleteValueSingleTableWorkOut", "Error en la estructura de datos");
        res.status(400).json({error:"Error en la estructura de datos"});
    }
}

export const setValuesMultipleTableWorkOut = (req,res) => {
    const table:string = req.path.slice(1);
    const dataValidated = validator[table](req.body);
    // console.log(dataValidated);
    if(dataValidated){
        const table:string = req.path.slice(1);
        services.insertMultiple(table,req.body)
            .then(()=>res.status(200).json({msg:'Pensum agregado'}))
            .catch(err => {
                console.log(err);
                res.status(400).json({error:err});
            });
    }else{
        console.log("deleteValueSingleTableWorkOut", "Error en la estructura de datos");
        res.status(400).json({error:"Error en la estructura de datos"});
    }
}

export const getAllTeachersWorkOut = (_,res) => {
    services.getAllTeachers()
        .then((result:oldFormat[])=>{
            res.status(200).json(transformTeacher(result));
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({error:err});
        });
}

export const getSingleTeachersWorkOut = (req,res) => {
    const idTeacher:number = Number(req.params.id);
    services.getTeacher(idTeacher)
        .then((result:oldFormat[])=>{
            res.status(200).json(transformTeacher(result));
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({error:err});
        });
}

export const getAllStudentsWorkOut = (req,res) => {
    const page = req.query.page ? Number(req.query.page) : 0;
    services.getAllStudents(page)
        .then(result=>res.status(200).json(result))
        .catch(err => {
            console.log(err);
            res.status(400).json({error:err});
        });
}

export const getSingleStudentsWorkOut = (req,res) => {
    services.getStudent(Number(req.params.id))
        .then(result=>res.status(200).json(result))
        .catch(err => {
            console.log(err);
            res.status(400).json({error:err});
        });
}

export const getProfessionWorkOut = (req,res) => {
    services.getPensum(Number(req.params.profession))
        .then( (result:pensumNotFormat[]) => {
            const newFormat:pesumFormat[] = [];
            const temp:number[]=[];
            result.forEach( (value:pensumNotFormat) => {
                // const index = newFormat.map((e:pesumFormat)=>e.IdSemesters).indexOf(value.IdSemesters);
                const index = temp.indexOf(value.IdSemesters);
                if(index<0){
                    newFormat.push({
                        IdSemesters: value.IdSemesters,
                        Name_Semesters: value.Name_Semesters,
                        Classes: [
                            {
                                IdClasses: value.IdClasses,
                                Name_Classes: value.Name_Classes
                            }
                        ]
                    });
                    temp.push(value.IdSemesters);
                }else{
                    newFormat[index].Classes.push({
                        IdClasses: value.IdClasses,
                        Name_Classes: value.Name_Classes
                    });
                }
            });
            res.status(200).json(newFormat);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({error:err});
        });
}