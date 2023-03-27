import express from 'express';

import * as workOutControllers from '../../controllers';

const router = express.Router();

//RUTAS PARA LOS PROFESORES
router.get('/teachers', workOutControllers.getAllTeachersWorkOut2);
router.get('/teachers/:id', workOutControllers.getSingleTeachersWorkOut2);
router.delete('/teachers', workOutControllers.deleteTeachersWorkOut);
router.put('/teachers', workOutControllers.updateValueSingleTableWorkOut2);

//RUTAS PARA LOS ESTUDIANTES
router.get('/students', workOutControllers.getAllStudentsWorkOut2);
router.put('/students', workOutControllers.updateValueSingleTableWorkOut2);
router.delete('/students', workOutControllers.deleteStudentWorkOut);

//RUTAS PARA LOS SCORES
router.get('/scores/:idStudents', workOutControllers.getScoresByIdStudent);
router.post('/scores/', workOutControllers.postScores);
router.put('/scores/', workOutControllers.updateScoresById);

export default router;