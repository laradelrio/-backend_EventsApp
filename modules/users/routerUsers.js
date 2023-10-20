const express = require('express');
const router = express.Router();

const usersCRUD = require('./users')

//Get All Users
router.get('/', async(req, res)=>{
    let response = await usersCRUD.getUsers();
    res.send(response);
})

//get ONE User
router.get('/user/:id', async(req, res) => {
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

//verify Token
router.get('/validateToken', async(req, res) => {
    try{
        let response = await usersCRUD.validateToken(req.body.token);
        res.send(response)
    }catch(error){
        res.send(error);
    }
})

//UPDATE USER INFO
router.put('/update/:id', async(req, res) => {
    let userId = req.params.id;
    try{
        let response = await usersCRUD.updateUser(userId,req);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})

//UPDATE USER PASSWORD
router.put('/update/password/:id', async(req, res) => {
    let userId = req.params.id;
    try{
        let response = await usersCRUD.updateUserPassword(userId,req);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})

//DELETE USER
router.delete('/delete/:id', async(req, res) => {
    let userId = req.params.id;
    try{
        let response = await usersCRUD.deleteUser(userId);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})







module.exports = router

