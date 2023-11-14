import express from 'express'

import * as workOutControllers from '../../controllers'
import { getProfile, validateToken } from '../../controllers/validateToken'

const router = express.Router()

// RUTAS PARA LOS PROFESORES
router.get('/teachers', validateToken, workOutControllers.getAllTeachersWorkOut2) // migrado
router.get('/teachers/:id', validateToken, workOutControllers.getSingleTeachersWorkOut2) //migrado
router.post('/teachers', validateToken, workOutControllers.setValuesTeachersWorkOut) // migrado
router.put('/teachers', validateToken, workOutControllers.updateValueSingleTableWorkOut2) // migrado
router.delete('/teachers', validateToken, workOutControllers.deleteTeachersWorkOut) // migrado
router.delete('/teachersDelete', validateToken, workOutControllers.deleteValueTeachersWorkOut)

// RUTAS PARA LOS ESTUDIANTES
router.get('/students', validateToken, workOutControllers.getAllStudentsWorkOut2)
router.get('/students/:IdPersons', validateToken, workOutControllers.getStundentByIdPersonsWorkOut)
router.post('/students', validateToken, workOutControllers.setValuesSingleTableWorkOut)
router.put('/students', validateToken, workOutControllers.updateValueSingleTableWorkOut2)
router.delete('/students', validateToken, workOutControllers.deleteStudentWorkOut)

// RUTAS PARA LOS SCORES
router.get('/scores/:idStudents', validateToken, workOutControllers.getScoresByIdStudent)
router.post('/scores', validateToken, workOutControllers.postScores)
router.put('/scores', validateToken, workOutControllers.updateScoresById)
router.post('/getClassesByProfessionAndSemesters', validateToken, workOutControllers.getClassesByProfessionAndSemesters)
router.post('/getTeachersByProfessionAndSemesters', validateToken, workOutControllers.getTeachersByProfessionAndSemesters)

router.get('/profile', getProfile)

export default router
