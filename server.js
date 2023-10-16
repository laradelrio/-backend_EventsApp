const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');

const server = express();
server.use(bodyParser.json());

dotenv.config({path: './.env'});

//Establish and connect to DB
const db = mysql.createConnection({
    host: process.env.DATABASE_EVENT_HOST,
    user: process.env.DATABASE_EVENT_USER,
    password: process.env.DATABASE_EVENT_PASSWORD,
    database: process.env.DATABASE_EVENT
})

server.get('/', (req, res) => {
    res.send('Server on local host 8080'); 
  });

//Establish port - Listen if server is running correctly
server.listen(8080, (error) =>{
    if (error){
        console.log("Server establishing error", error)
    }else{
        console.log("Server started on port 8080")
    }
})

db.connect( (error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("MySQL Connected...")
    }
})




//ADD USER
server.post("/api/users/new", async(req, res) => {

    db.query(`SELECT name FROM users WHERE name='${req.body.name}'`, async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            if (results.length > 0) {
                res.send({ status: false, message:`Username Taken`});
            } else {
                db.query(`SELECT email FROM users WHERE email='${req.body.email}'`, async (errorEmail, resultsEmail) => {
                    if(error){
                        console.log(errorEmail);
                    }else {
                        if (resultsEmail.length > 0) {
                            res.send({ status: false, message:`Email Already Registered`});
                        }else{
                            let password = req.body.password;
                            let passwordConfirmed = req.body.passwordConfirmed;
            
                            if (password !== passwordConfirmed) {
                                res.send({ status: false, message: "Passwords Don't Match" });
                            } else {
                                let hashedPassword = await bcryptjs.hash(req.body.password, 8);
                                let sql = `INSERT INTO users (name, email, password) 
                                VALUES ('${req.body.name}','${req.body.email}','${hashedPassword}')`
            
                                db.query(sql, (error) => {
                                    if (error) {
                                        res.send({ status: false, message: "User Creation Failed", error });
                                    } else {
                                        res.send({ stauts: true, message: `User Created Successfully` });
                                    }
                                })
                            }
                        }
                        
                    }
                })
            }
        }
    })
})    



//GET ALL USERS
server.get("/api/users", (req, res) => {
    db.query('SELECT * FROM users', (error, result) => {
        if(error)  {
            console.log("Error connecting to the the DataBase")
        } else {
            res.send({ status: true, data: result})
        }
    })
})

//LOG IN
server.get("/api/login/:id", (req, res) => {
    let userId = req.params.id;
    db.query('SELECT * FROM users WHERE id_user=' + userId, (error, result) => {
        if(error)  {
            console.log("User not found")
        } else {
            const token = jwt.sign({ //{payload},secret,
                id_user: userId,
            }, process.env.TOKEN_SECRET)

            res.header('auth-token', token).json({
                typ:"JWT",
                data: {token}
            })
            // res.send({ status: true, data: result})
        }
    })
})

//GET ONE USER -name and email 
server.get("/api/users/:id", (req, res) => {
    let userId = req.params.id;
    db.query('SELECT * FROM users WHERE id_user=' + userId, (error, result) => {
        if(error)  {
            console.log("User not found")
        } else {
            res.send({ status: true, data: {name: result[0].name, email: result[0].email, image: result[0].image}})
        }
    })
})

//UPDATE USERS
server.put("/api/users/update/:id", async(req, res) => {
    let hashedPassword;
    /*TODO in the front wehn update Clicked, we get the user's name, email, have it pre-fill teh form. 
    if passowrd input is blank, then */

    //if the user changed the password, then hash and save it, if not, use original one
    let newPassword = req.body.password;
    let newPasswordConfirmed = req.body.passwordConfirmed;

    if( newPassword.length > 0 || newPasswordConfirmed.length > 0){
      if(newPassword !== newPasswordConfirmed){
        res.send({ status: false, message: "Passwords Don't Match" })
      }else{
        hashedPassword =  await bcryptjs.hash(req.body.password, 8);
      }
    }else {
        db.query(`SELECT password FROM users WHERE id_user='${req.params.id}'`, (error, result) => {
            if(error)  {
                res.send({ status: false, message: "Update failed not found"})
            } else {
                hashedPassword = result;
            }
        }) 
    }

    //actual update
    let sql =`UPDATE users SET name='${req.body.name}', email='${req.body.email}', password='${hashedPassword}',
     image='${req.body.image}' WHERE id_user=${req.params.id}`
    
    db.query(sql, (error, result)=> {   
        if(error){
            res.send({ status: false, message: "User Update Failed",error});
        }else{
            res.send({ status: true, message: "User Updated Successfully"});
        }
        })
    
})

//DELETE USER
server.delete("/api/users/delete/:id", (req, res) => {
    db.query("DELETE FROM users WHERE id_user=" + req.params.id + "", (error) => {
        if(error){
            res.send ({ status: false, message: "User Deletion Failed"})
        } else {
            res.send({ stauts: true, message: "User Deleted Successfully"})
        }
    })
})


//TODO: ADD LOGIN AND RETURN JWT TOKEN OR RETURN JWT TOKEN ON GET ONE USER METHOD

/*
//LOGIN USER
//JWT --> SEND BACK THE USER ID !!!
server.get("/api/users/:id", (req, res) => {
    let userId = req.params.id;
    db.query('SELECT * FROM users WHERE id_user=' + userId, (error, result) => {
        if(error)  {
            console.log("User not found")
        } else {
            res.send({ status: true, data: result})
        }
    })
})
*/



//TODO: FIX ALL THE EVENTS CRUD

/*
//ADD EVENT
server.post("/api/events/add"), (req, res) => {
    const details =  { 
        name: req.body.name,
        organizer: req.body.organizer,
        category: req.body.category,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        image: req.body.image,
        } = req.body;
    
    //check if event with same name
    db.query('SELECT name FROM events WHERE name = ?', [details.name], async(error, results) => {
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            res.send ({status: false, message: "Event Name Taken"});
        }else {

            db.query('INSERT INTO events SET ?', details, (error) => {
                if(error){
                    res.send({ status: false, message: "Event Creation Failed"});
                }else {
                    res.send({ stauts: true, message: "Event Created Successfully"})
                }
            })

        }
    })

//GET ALL EVENTS
server.get("/api/events", (req, res) => {
    db.query('SELECT * FROM events', (error, result) => {

        if(error)  {
            console.log("Error connecting to the the DataBase")
        } else {
            res.send({ status: true, data: result})
        }
    })
})

//GET ONE EVENT
server.get("/api/events/:id", (req, res) => {
    let eventId = req.params.id;
    db.query('SELECT * FROM events WHERE id_event=' + eventId, (error, result) => {
        if(error)  {
            console.log("Error connecting to the the DataBase")
        } else {
            res.send({ status: true, data: result})
        }
    })
})

//UPDATE EVENT
server.put("/api/events/update/:id", (req, res) => {
    let sql =
    "UPDATE events SET name='" +  req.body.name +
    "', organizer='" + req.body.organizer + 
    "', category='" + req.body.category +
    "', description='" + req.body.description +
    "', date='" + req.body.date +
    "', time='" + req.body.time +
    "', location='" + req.body.location +
    "', image=:'" + req.body.image +
    "' WHERE id_event=" + req.params.id;

    db.query(sql, (error, result)=> {
        if(error){
            res.send({ status: false, message: "Event Update Failed"});
        }else{
            res.send({ status: true, message: "Event Updated Successfully"});
        }
    })
})

//DELETE EVENT
server.delete("/api/events/delete/:id", (req, res) => {
    db.query("DELETE FROM events WHERE id_event=" + req.param.id + "", (error) => {
        if(error){
            res.send ({ status: false, message: "Event Deletion Failed"})
        } else {
            res.send({ stauts: true, message: "Event Deleted Successfully"})
        }
    })
})

}

*/



   
