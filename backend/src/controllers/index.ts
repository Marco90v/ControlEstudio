import * as services from "../services";
import { transformTeacher } from "../transform";
import { dbClasses, oldFormat, pensumNotFormat, pesumFormat } from "../types";

export const getAllAdminWorkOut = (_,res) => {
    services.getAllAdmin()
        .then(resolve=>res.status(200).json(resolve))
        .catch(err=>console.log(err));
}

export const getAllWorkOut = (req,res) => {
    const table:string = req.path.slice(1);
    services.getAll(table)
        .then(resolve=>res.status(200).json(resolve))
        .catch(err=>console.log(err));
}

export const setValuesSingleTableWorkOut = (req,res) => {
    // const valida = ((object: any):object is dbClasses => 'names' in object)(req.body);
    const valida = true;
    if(valida){
        const table:string = req.path.slice(1);
        services.insertSingle(table,req.body)
            .then(()=>res.status(200).json({msg:'Valores agregados'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
}

export const setValuesMultipleTableWorkOut = (req,res) => {
    //     const valida = ((objects: any[]):objects is dbPensum[] => {
//         let r = true;
//         for (let index = 0; index < objects.length; index++) {
//             if(!('IdProfession' in objects[index]) || !('IdSemesters' in objects[index]) || !('IdClasses' in objects[index])){
//                 r = false;
//                 break;
//             }
//         }
//         return r;
//     })(req.body);
    const valida = true;
    if(valida){
        const table:string = req.path.slice(1);
        services.insertMultiple(table,req.body)
            .then(()=>res.status(200).json({msg:'Pensum agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
}

export const getAllTeachersWorkOut = (_,res) => {
        services.getAllTeachers()
        .then((result:oldFormat[])=>{
            res.status(200).json(transformTeacher(result));
        })
        .catch(err=>console.log(err));
}

export const getSingleTeachersWorkOut = (req,res) => {
    const idTeacher:number = Number(req.params.id);
    services.getTeacher(idTeacher)
        .then((result:oldFormat[])=>{
            res.status(200).json(transformTeacher(result));
        })
        .catch(err=>console.log(err));
}

// export const setTeachersWorkOut = (req, res) => {
// //     const valida = ((object: any):object is dbTeachers => {
// //         return 'IdPersons' in object &&
// //             "IdProfession" in object &&
// //             "IdSemesters" in object &&
// //             "IdClasses" in object &&
// //             "IdShifts" in object &&
// //             "IdSections" in object;
// //     })(req.body);
//     const valida = true;
//     if(valida){
//         services.insertSingle('teachers',req.body)
//             .then(()=>res.status(200).json({msg:'Profesor agregado'}))
//             .catch(err=>console.log(err));
//     }else{
//         res.status(400).json({msg:"Error en la estructura de datos"});
//     }
// }

export const getAllStudentsWorkOut = (req,res) => {
    const page = req.query.page ? Number(req.query.page) : 0;
    services.getAllStudents(page)
        .then(result=>res.status(200).json(result))
        .catch(err=>console.log(err));
}

export const getSingleStudentsWorkOut = (req,res) => {
    services.getStudent(Number(req.params.id))
        .then(result=>res.status(200).json(result))
        .catch(err=>console.log(err));
}

export const setProfessionWorkOut = (req,res) => {
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
        .catch(err=>console.log(err));
}