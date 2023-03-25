import express from 'express';

import * as workOutControllers from '../../controllers';

const router = express.Router();

router.get('/teachers', workOutControllers.getAllTeachersWorkOut2);
router.get('/teachers/:id', workOutControllers.getSingleTeachersWorkOut2);
router.delete('/teachers', workOutControllers.deleteTeachersWorkOut);
router.put('/teachers', workOutControllers.updateValueSingleTableWorkOut2);


export default router;