const express = require('express');
const router = express.Router();

const eventsCRUD = require('./events');


router.get('/', async(req, res)=>{
    res.send('events works!');
})

module.exports = router