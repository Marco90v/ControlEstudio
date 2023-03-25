import express from 'express';

import * as workOutControllers from '../../controllers';

const router = express.Router();

// router.post('/logout', (req, res)=>{
//     res.status(200).json({msg:'logout'});
// });


// RUTAS ADMIN
router.get('/admin', workOutControllers.getAllAdminWorkOut);

// RUTAS PARA LAS MATERIAS
router.get('/classes', workOutControllers.getAllWorkOut);
router.post('/classes', workOutControllers.setValuesSingleTableWorkOut);
router.put('/classes', workOutControllers.updateValueSingleTableWorkOut);
router.delete('/classes', workOutControllers.deleteValueSingleTableWorkOut);

// RUTA PARA LOS SEMESTRES
router.get('/semesters', workOutControllers.getAllWorkOut);
router.post('/semesters', workOutControllers.setValuesSingleTableWorkOut);

// RUTAS PARA LAS PROFESIONES
router.get('/profession', workOutControllers.getAllWorkOut);
router.post('/profession', workOutControllers.setValuesSingleTableWorkOut);
router.put('/profession', workOutControllers.updateValueSingleTableWorkOut);
router.delete('/profession', workOutControllers.deleteValueSingleTableWorkOut);

//RUTAS PARA LOS TURNOS
router.get('/shifts', workOutControllers.getAllWorkOut);
router.post('/shifts', workOutControllers.setValuesSingleTableWorkOut);

//RUTAS PARA LAS SECCIONES
router.get('/sections', workOutControllers.getAllWorkOut);
router.post('/sections', workOutControllers.setValuesSingleTableWorkOut);

//RUTAS PARA LOS ROLES
router.get('/roles', workOutControllers.getAllWorkOut);
router.post('/roles', workOutControllers.setValuesSingleTableWorkOut);

// RUTAS PARA LAS PERSONAS
router.get('/persons', workOutControllers.getAllWorkOut);
router.get('/persons/:role', workOutControllers.getPersonByRoleWorkOut);
router.post('/persons', workOutControllers.setValuesSingleTableWorkOut);
router.put('/persons', workOutControllers.updatePersonById);
router.delete('/persons', workOutControllers.deleteValueSingleTableWorkOut);

// RUTA PARA LOGIN
router.get('/login', workOutControllers.getAllWorkOut);
// router.post('/persons', workOutControllers.setValuesSingleTableWorkOut);

//RUTAS PARA LOS PROFESORES
router.get('/teachers', workOutControllers.getAllTeachersWorkOut);
router.get('/teachers/:id', workOutControllers.getSingleTeachersWorkOut);
// router.post('/teachers', workOutControllers.setValuesSingleTableWorkOut);
router.post('/teachers', workOutControllers.setValuesTeachersWorkOut);
router.delete('/teachers', workOutControllers.deleteValueTeachersWorkOut);

//RUTAS PARA LOS ESTUDIANTES
router.get('/students', workOutControllers.getAllStudentsWorkOut);
router.get('/students/:id', workOutControllers.getSingleStudentsWorkOut);
router.post('/students', workOutControllers.setValuesSingleTableWorkOut);

//RUTAS PARA LOS ADMINISTRADORES
router.post('/admin', workOutControllers.setValuesSingleTableWorkOut);

//RUTAS PARA PENSUM
// router.get('/students', workOutControllers.getAllStudentsWorkOut);
router.get('/pensum/:profession', workOutControllers.getProfessionWorkOut);
router.post('/pensum', workOutControllers.setValuesMultipleTableWorkOut);
router.delete('/pensum', workOutControllers.deleteValueSingleTableWorkOut);



export default router;