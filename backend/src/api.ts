import express from 'express';
import { getAll } from './db';

const router = express.Router();

// router.post('/login', (req, res)=>{
//     const r = req.body;
//     r.msg = 'login';
//     console.log(r);
//     res.status(200).json(r);
// });

// router.post('/logout', (req, res)=>{
//     res.status(200).json({msg:'logout'});
// });

// router.get('/profession', (req, res)=>{
//     res.status(200).json({msg:'profession'});
// });

// router.get('/personas', (req, res)=>{
//     res.status(200).json({msg:'personas'});
// });

router.get('/classes', (req,res)=>{
    getAll('classes').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));
});

router.get('/semesters', async(req,res)=>{
    getAll('semesters').then(resolve=>res.status(200).json(resolve))
    .catch(err=>console.log(err));

});




export default router;