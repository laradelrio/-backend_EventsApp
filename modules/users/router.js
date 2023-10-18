const express = require('express');
const router = express.Router();

const usersCRUD = require('./users')

//Get All UusersS
router.get('/', async(req, res)=>{
    let response = await usersCRUD.getUsers();
    res.send(response);
})

//get ONE User
router.get('/:id', async(req, res) => {
    let userId = req.params.id;
    try{
        let response = await usersCRUD.getOneUser(userId);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})


//Add Users
router.post('/add', async(req, res) => {
    try{
        let response = await usersCRUD.postUser(req);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})

//Login
router.get('/login', async(req, res) => {
    try{
        let token = await usersCRUD.login(req);
        res.header('auth-token', token).json({
            typ: "JWT",
            data: { token }
        });
    }catch(error){
        res.send(error);
    }

})



module.exports = router

