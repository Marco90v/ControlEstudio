import express from 'express';
import { getAll, insert } from './db';
import { dbAdmin, dbStudensts, dbTeachers, dbSections, dbClasses, dbSemesters, dbProfession, dbShifts, dbRoles, dbPersons } from './types';

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
        insert('classes',req.body)
            .then(()=>res.status(200).json({msg:'Materia agregada'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

// RUTA PARA LOS SEMESTRES
router.get('/semesters', async(req,res)=>{
    getAll('semesters').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/semesters', (req,res)=>{
    const valida = ((object: any):object is dbSemesters => 'names' in object)(req.body);
    if(valida){
        insert('semesters',req.body)
            .then(()=>res.status(200).json({msg:'Semestre agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

// RUTAS PARA LAS PROFESIONES
router.get('/profession', async(req,res)=>{
    getAll('profession').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/profession', (req,res)=>{
    const valida = ((object: any):object is dbProfession => 'names' in object)(req.body);
    if(valida){
        insert('profession',req.body)
            .then(()=>res.status(200).json({msg:'Profesion agregada'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

//RUTAS PARA LOS TURNOS
router.get('/shifts', async(req,res)=>{
    getAll('shifts').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/shifts', (req,res)=>{
    const valida = ((object: any):object is dbShifts => 'names' in object)(req.body);
    if(valida){
        insert('shifts',req.body)
            .then(()=>res.status(200).json({msg:'Turno agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

//RUTAS PARA LAS SECCIONES
router.get('/sections', async(req,res)=>{
    getAll('sections').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/sections', async(req,res)=>{
    const valida = ((object: any):object is dbSections => 'names' in object)(req.body);
    if(valida){
        insert('sections',req.body)
            .then(()=>res.status(200).json({msg:'Seccion agregada'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

//RUTAS PARA LOS ROLES
router.get('/roles', async(req,res)=>{
    getAll('roles').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/roles', async(req,res)=>{
    const valida = ((object: any):object is dbRoles => 'names' in object)(req.body);
    if(valida){
        insert('roles',req.body)
            .then(()=>res.status(200).json({msg:'Rol agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});


// RUTAS PARA LAS PERSONAS
router.get('/persons', async(req,res)=>{
    getAll('persons').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});
router.post('/persons', async(req,res)=>{
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
        insert('persons',req.body)
            .then(()=>res.status(200).json({msg:'Persona agregada'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});


// RUTA PARA LOGIN
router.get('/login', async(req,res)=>{
    getAll('login').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});

//RUTAS PARA LOS PROFESORES
router.post('/teachers', async(req,res)=>{
    const valida = ((object: any):object is dbTeachers => {
        return 'IdPersons' in object &&
            "IdProfession" in object &&
            "IdSemesters" in object &&
            "IdClasses" in object &&
            "IdShifts" in object &&
            "IdSections" in object;
    })(req.body);
    if(valida){
        insert('teachers',req.body)
            .then(()=>res.status(200).json({msg:'Profesor agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

//RUTAS PARA LOS ESTUDIANTES
router.post('/students', async(req,res)=>{
    const valida = ((object: any):object is dbStudensts => {
        return 'IdPersons' in object &&
            "IdProfession" in object &&
            "IdSemesters" in object;
    })(req.body);
    if(valida){
        insert('students',req.body)
            .then(()=>res.status(200).json({msg:'Estudiante agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});

//RUTAS PARA LOS ADMINISTRADORES
router.post('/admin', async(req,res)=>{
    const valida = ((object: any):object is dbAdmin => 'IdPersons' in object)(req.body);
    if(valida){
        insert('admin',req.body)
            .then(()=>res.status(200).json({msg:'Admin agregado'}))
            .catch(err=>console.log(err));
    }else{
        res.status(400).json({msg:"Error en la estructura de datos"});
    }
});




export default router;