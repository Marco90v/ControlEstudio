import express from 'express';

import * as workOutControllers from '../../controllers';
import { validateToken } from '../../controllers/validateToken';

const router = express.Router();

// router.post('/logout', (req, res)=>{
//     res.status(200).json({msg:'logout'});
// });


// RUTAS ADMIN
router.get('/admin', workOutControllers.getAllAdminWorkOut);

// RUTAS PARA LAS MATERIAS
router.get('/classes', validateToken, workOutControllers.getAllWorkOut);
router.post('/classes', validateToken,workOutControllers.setValuesSingleTableWorkOut);
router.put('/classes', validateToken,workOutControllers.updateValueSingleTableWorkOut);
router.delete('/classes', validateToken,workOutControllers.deleteValueSingleTableWorkOut);

// RUTA PARA LOS SEMESTRES
router.get('/semesters', validateToken,workOutControllers.getAllWorkOut);
router.post('/semesters', validateToken,workOutControllers.setValuesSingleTableWorkOut);

// RUTAS PARA LAS PROFESIONES
router.get('/profession', validateToken,workOutControllers.getAllWorkOut);
router.post('/profession', validateToken,workOutControllers.setValuesSingleTableWorkOut);
router.put('/profession', validateToken,workOutControllers.updateValueSingleTableWorkOut);
router.delete('/profession', validateToken,workOutControllers.deleteValueSingleTableWorkOut);

//RUTAS PARA LOS TURNOS
router.get('/shifts', validateToken,workOutControllers.getAllWorkOut);
router.post('/shifts', validateToken,workOutControllers.setValuesSingleTableWorkOut);

//RUTAS PARA LAS SECCIONES
router.get('/sections', validateToken,workOutControllers.getAllWorkOut);
router.post('/sections', validateToken,workOutControllers.setValuesSingleTableWorkOut);

//RUTAS PARA LOS ROLES
router.get('/roles', validateToken,workOutControllers.getAllWorkOut);
router.post('/roles', validateToken,workOutControllers.setValuesSingleTableWorkOut);

// RUTAS PARA LAS PERSONAS
router.get('/persons', validateToken,workOutControllers.getAllWorkOut);
router.get('/persons/:role', validateToken,workOutControllers.getPersonByRoleWorkOut);
router.get('/person', validateToken,workOutControllers.getPersonByIdWorkOut);
router.post('/persons', validateToken,workOutControllers.setValuesSingleTableWorkOut);
router.put('/persons', validateToken,workOutControllers.updatePersonById);
router.delete('/persons', validateToken,workOutControllers.deleteValueSingleTableWorkOut);

// RUTA PARA LOGIN
router.post('/login', workOutControllers.login);
// router.post('/persons', workOutControllers.setValuesSingleTableWorkOut);

//RUTAS PARA LOS PROFESORES
router.get('/teachers', validateToken,workOutControllers.getAllTeachersWorkOut);
router.get('/teachers/:id', validateToken,workOutControllers.getSingleTeachersWorkOut);
// router.post('/teachers', workOutControllers.setValuesSingleTableWorkOut);
router.post('/teachers', validateToken,workOutControllers.setValuesTeachersWorkOut);
router.delete('/teachers', validateToken,workOutControllers.deleteValueTeachersWorkOut);

//RUTAS PARA LOS ESTUDIANTES
router.get('/students', validateToken,workOutControllers.getAllStudentsWorkOut);
router.get('/students/:id', validateToken,workOutControllers.getSingleStudentsWorkOut);
router.post('/students', validateToken,workOutControllers.setValuesSingleTableWorkOut);

//RUTAS PARA LOS ADMINISTRADORES
router.post('/admin', validateToken,workOutControllers.setValuesSingleTableWorkOut);

//RUTAS PARA PENSUM
// router.get('/students', workOutControllers.getAllStudentsWorkOut);
router.get('/pensum/:profession', validateToken,workOutControllers.getProfessionWorkOut);
router.post('/pensum', validateToken,workOutControllers.setValuesMultipleTableWorkOut);
router.delete('/pensum', validateToken,workOutControllers.deleteValueSingleTableWorkOut);



export default router;