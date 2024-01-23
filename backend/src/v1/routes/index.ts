import express from 'express'

import * as workOutControllers from '../../controllers/index.js'
import { validateToken } from '../../controllers/validateToken.js'

const router = express.Router()

// router.post('/logout', (req, res)=>{
//     res.status(200).json({msg:'logout'});
// });

// RUTAS ADMIN
router.get('/admin', workOutControllers.getAllAdminWorkOut) // migrado

// RUTAS PARA LAS MATERIAS
router.get('/classes', validateToken, workOutControllers.getAllWorkOut) // migado
router.post('/classes', validateToken, workOutControllers.setValuesSingleTableWorkOut) // migrado
router.put('/classes', validateToken, workOutControllers.updateValueSingleTableWorkOut) // migrado
router.delete('/classes', validateToken, workOutControllers.deleteValueSingleTableWorkOut) // migrado

// RUTA PARA LOS SEMESTRES
router.get('/semesters', validateToken, workOutControllers.getAllWorkOut) // migrado
router.post('/semesters', validateToken, workOutControllers.setValuesSingleTableWorkOut) // migrado
// agrega update y delete en la migración

// RUTAS PARA LAS PROFESIONES
router.get('/profession', validateToken, workOutControllers.getAllWorkOut) // migrado
router.post('/profession', validateToken, workOutControllers.setValuesSingleTableWorkOut) // migrado
router.put('/profession', validateToken, workOutControllers.updateValueSingleTableWorkOut) // migrado
router.delete('/profession', validateToken, workOutControllers.deleteValueSingleTableWorkOut) // migrado

// RUTAS PARA LOS TURNOS
router.get('/shifts', validateToken, workOutControllers.getAllWorkOut) // migrado
router.post('/shifts', validateToken, workOutControllers.setValuesSingleTableWorkOut) // migrado
// agrega update y delete en migración

// RUTAS PARA LAS SECCIONES
router.get('/sections', validateToken, workOutControllers.getAllWorkOut) // migrado
router.post('/sections', validateToken, workOutControllers.setValuesSingleTableWorkOut) // migrado
// agrega update y delete en migración

// RUTAS PARA LOS ROLES
router.get('/roles', validateToken, workOutControllers.getAllWorkOut) // migrado
router.post('/roles', validateToken, workOutControllers.setValuesSingleTableWorkOut) // migrado
// agrega update y delete en migración

// RUTAS PARA LAS PERSONAS
router.get('/persons', validateToken, workOutControllers.getAllWorkOut) // migrado
router.get('/persons/:role', validateToken, workOutControllers.getPersonByRoleWorkOut) // migrado
router.get('/person', validateToken, workOutControllers.getPersonByIdWorkOut) // migrado
router.post('/persons', validateToken, workOutControllers.setValuesSingleTableWorkOut) // migrado
router.put('/persons', validateToken, workOutControllers.updatePersonById) // migrado
router.delete('/persons', validateToken, workOutControllers.deleteValueSingleTableWorkOut) // migrado

// RUTA PARA LOGIN
// router.post('/login', workOutControllers.login)
// router.post('/persons', workOutControllers.setValuesSingleTableWorkOut);

// RUTAS PARA LOS PROFESORES
// router.get('/teachers', validateToken, workOutControllers.getAllTeachersWorkOut)
// router.get('/teachers/:id', validateToken, workOutControllers.getSingleTeachersWorkOut)
// router.post('/teachers', workOutControllers.setValuesSingleTableWorkOut);
router.post('/teachers', validateToken, workOutControllers.setValuesTeachersWorkOut)
router.delete('/teachers', validateToken, workOutControllers.deleteValueTeachersWorkOut)

// RUTAS PARA LOS ESTUDIANTES
router.get('/students', validateToken, workOutControllers.getAllStudentsWorkOut)
router.get('/students/:id', validateToken, workOutControllers.getSingleStudentsWorkOut)
router.post('/students', validateToken, workOutControllers.setValuesSingleTableWorkOut)

// RUTAS PARA LOS ADMINISTRADORES
router.post('/admin', validateToken, workOutControllers.setValuesSingleTableWorkOut)

// RUTAS PARA PENSUM
// router.get('/students', workOutControllers.getAllStudentsWorkOut);
router.get('/pensum/:profession', validateToken, workOutControllers.getProfessionWorkOut) //  migrado
router.post('/pensum', validateToken, workOutControllers.setValuesMultipleTableWorkOut)
router.delete('/pensum', validateToken, workOutControllers.deleteValueSingleTableWorkOut)

export default router
