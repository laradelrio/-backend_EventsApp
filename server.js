const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();
exports.server = server;

server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('Server on local host 8080'); 
});

//Establish port - Listen if server is running correctly
server.listen(8080, (error) =>{
    if (error){
        console.log("Server establishing error", error);
    }else{
        console.log("Server started on port 8080");
    }
})


//Routes

const usersRoute = require('./modules/users/routerUsers');
const eventsRoute = require('./modules/events/routerEvents');
server.use('/api/users', usersRoute);
server.use('/api/events', eventsRoute);


