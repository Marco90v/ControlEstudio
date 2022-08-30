import express from 'express';
import { getAll, insertSingle, insertMultiple, getPensum } from './db';
import { dbAdmin, dbStudensts, dbTeachers, dbSections, dbClasses, dbSemesters, dbProfession, dbShifts, dbRoles, dbPersons, dbPensum, pensumNotFormat, pesumFormat } from './types';

const router = express.Router();

// router.post('/logout', (req, res)=>{
//     res.status(200).json({msg:'logout'});
// });


// RUTAS PARA LAS MATERIAS
router.get('/classes', (req,res)=>{
    getAll('classes').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/classes', (req,res)=>{
    const valida = ((object: any):object is dbClasses => 'names' in object)(req.body);
    if(valida){
        insertSingle('classes',req.body)
            .then(()=>res.status(200).json({msg:'Materia agregada'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

// RUTA PARA LOS SEMESTRES
router.get('/semesters', (req,res)=>{
    getAll('semesters').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/semesters', (req,res)=>{
    const valida = ((object: any):object is dbSemesters => 'names' in object)(req.body);
    if(valida){
        insertSingle('semesters',req.body)
            .then(()=>res.status(200).json({msg:'Semestre agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

// RUTAS PARA LAS PROFESIONES
router.get('/profession', (req,res)=>{
    getAll('profession').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/profession', (req,res)=>{
    const valida = ((object: any):object is dbProfession => 'names' in object)(req.body);
    if(valida){
        insertSingle('profession',req.body)
            .then(()=>res.status(200).json({msg:'Profesion agregada'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

//RUTAS PARA LOS TURNOS
router.get('/shifts', (req,res)=>{
    getAll('shifts').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/shifts', (req,res)=>{
    const valida = ((object: any):object is dbShifts => 'names' in object)(req.body);
    if(valida){
        insertSingle('shifts',req.body)
            .then(()=>res.status(200).json({msg:'Turno agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

//RUTAS PARA LAS SECCIONES
router.get('/sections', (req,res)=>{
    getAll('sections').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/sections', (req,res)=>{
    const valida = ((object: any):object is dbSections => 'names' in object)(req.body);
    if(valida){
        insertSingle('sections',req.body)
            .then(()=>res.status(200).json({msg:'Seccion agregada'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

//RUTAS PARA LOS ROLES
router.get('/roles', (req,res)=>{
    getAll('roles').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/roles', (req,res)=>{
    const valida = ((object: any):object is dbRoles => 'names' in object)(req.body);
    if(valida){
        insertSingle('roles',req.body)
            .then(()=>res.status(200).json({msg:'Rol agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});


// RUTAS PARA LAS PERSONAS
router.get('/persons', (req,res)=>{
    getAll('persons').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/persons', (req,res)=>{
    const valida = ((object: any):object is dbPersons => {
        return 'names' in object &&
        'lastNames' in object &&
        'sex' in object &&
        'email' in object &&
        'phone' in object &&
        'photo' in object &&
        'role' in object;
    })(req.body);
    if(valida){
        insertSingle('persons',req.body)
            .then(()=>res.status(200).json({msg:'Persona agregada'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});


// RUTA PARA LOGIN
router.get('/login', (req,res)=>{
    getAll('login').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});


//RUTAS PARA LOS PROFESORES
router.post('/teachers', (req,res)=>{
    const valida = ((object: any):object is dbTeachers => {
        return 'IdPersons' in object &&
            "IdProfession" in object &&
            "IdSemesters" in object &&
            "IdClasses" in object &&
            "IdShifts" in object &&
            "IdSections" in object;
    })(req.body);
    if(valida){
        insertSingle('teachers',req.body)
            .then(()=>res.status(200).json({msg:'Profesor agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

//RUTAS PARA LOS ESTUDIANTES

router.post('/students', (req,res)=>{
    const valida = ((object: any):object is dbStudensts => {
        return 'IdPersons' in object &&
            "IdProfession" in object &&
            "IdSemesters" in object;
    })(req.body);
    if(valida){
        insertSingle('students',req.body)
            .then(()=>res.status(200).json({msg:'Estudiante agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

//RUTAS PARA LOS ADMINISTRADORES
router.post('/admin', (req,res)=>{
    const valida = ((object: any):object is dbAdmin => 'IdPersons' in object)(req.body);
    if(valida){
        insertSingle('admin',req.body)
            .then(()=>res.status(200).json({msg:'Admin agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});



//RUTAS PARA PENSUM
router.get('/pensum/:profession', (req,res)=>{
    getPensum(Number(req.params.profession))
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
});
router.post('/pensum', (req, res)=>{
    const valida = ((objects: any[]):objects is dbPensum[] => {
    let r = true;
    for (let index = 0; index < objects.length; index++) {
        if(!('IdProfession' in objects[index]) || !('IdSemesters' in objects[index]) || !('IdClasses' in objects[index])){
            r = false;
            break;
        }
    }
    return r;
    })(req.body);
    if(valida){
        insertMultiple('pensum',req.body)
            .then(()=>res.status(200).json({msg:'Pensum agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});



export default router;