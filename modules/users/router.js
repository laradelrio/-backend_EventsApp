const express = require('express');
const router = express.Router();

const usersCRUD = require('./users')

router.get('/', async(req, res)=>{
    let response = await usersCRUD.getUsers();
    res.send(response);
})

router.post('/add', async(req, res) => {
    try{
        let response = await usersCRUD.postUser(req);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})

module.exports = router

