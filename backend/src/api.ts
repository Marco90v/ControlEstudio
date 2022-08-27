import express from 'express';

const router = express.Router();

router.post('/login', (req, res)=>{
    const r = req.body;
    r.msg = 'login';
    console.log(r);
    res.status(200).json(r);
});

router.post('/logout', (req, res)=>{
    res.status(200).json({msg:'logout'});
});

router.get('/profession', (req, res)=>{
    res.status(200).json({msg:'profession'});
});


router.get('/personas', (req, res)=>{
    res.status(200).json({msg:'personas'});
});

export default router;