const express = require('express');
const router = express.Router();

const eventsCRUD = require('./events');


//Get All Events
router.get('/', async(req, res)=>{
    let response = await eventsCRUD.getEvents();
    res.send(response);
})

//get ONE User
router.get('/event/:id', async(req, res) => {
    let eventId = req.params.id;
    try{
        let response = await eventsCRUD.getOneEvent(eventId);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})

//Add Event
router.post('/add', async(req, res) => {
    try{
        let response = await eventsCRUD.postEvent(req);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})



module.exports = router