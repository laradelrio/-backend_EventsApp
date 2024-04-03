const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
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

var corsOptions = {
    origin: "https://events-app-nine-chi.vercel.app",
    credentials: true,
};

server.use(cors(corsOptions));


// a middleware with no mount path; gets executed for every request to the app
server.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'https://events-app-nine-chi.vercel.app');
    res.setHeader("Access-Control-Allow-Methods", '*' );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    next();
  });


//Routes
const usersRoute = require('./modules/users/routerUsers');
const eventsRoute = require('./modules/events/routerEvents');
server.use('/api/users', usersRoute);
server.use('/api/events', eventsRoute);


