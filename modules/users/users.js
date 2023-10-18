const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { server } = require('../../server');
const {db} = require('../../db');

const f = require('./usersHelperFunctions');
const { response } = require('express');

const dotenv = require('dotenv');
dotenv.config({path: './.env'}); 

//Get ALL USERS
function getUsers() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (error, result) => {
            if (error) {
                reject({ status: false, message: "Error connecting to the the DataBase" });
            } else {
                resolve({ status: true, data: result });
            }
        });
    })
}

//GET ONE USER
function getOneUser(id){
    return new Promise((resolve, reject) => {
        try{
            db.query('SELECT * FROM users WHERE id_user=' + id, (error, result) => {
                if (error) {
                    console.log("User not found");
                } else {
                    resolve({ status: true, data: { username: result[0].username, email: result[0].email, image: result[0].image } });
                }
            }); 
        }catch(error){
            reject({status: false, message: "User not found"});
        }
    })
}

//ADD USER
async function postUser(req) {

    if (await f.isRegistered("email", req.body.email) === true) {
        return ({ status: false, message: `Email Already Registered` });
    }

    if (await f.isRegistered("username", req.body.username) === true) {
        return ({ status: false, message: `Username Taken` });
    }

    if (f.isSamePassword(req.body.password, req.body.passwordConfirmed) === false) {
        return ({ status: false, message: "Passwords Don't Match" });
    } else {
        return new Promise(async (resolve, reject) => {
            try {
                let hashedPassword = await bcryptjs.hash(req.body.password, 8);
                let sql = `INSERT INTO users (username, email, password) VALUES ('${req.body.username}','${req.body.email}','${hashedPassword}')`;

                db.query(sql, (error) => {
                    if (error) {
                        reject({ status: false, message: "User Creation Failed" });
                    } else {
                        resolve({ stauts: true, message: `User Created Successfully` });
                    }
                });
            } catch (error) {
                reject("Unable to Create User");
            }
        })
    }
}
    
//LOG IN
async function login(req){
   return new Promise(async (resolve, reject) =>{
        if (await f.isRegistered("email", req.body.email) === false) {
            reject({ status: false, message: `No account associated to this email` });
        }else {
            let storedPassword = await f.getStoredPassword(req.body.email);
            let isPasswordValid = await bcryptjs.compare(req.body.password, storedPassword[0].password);
            
            if(!isPasswordValid){
                    reject({ status: false, message: "Incorrect Password" });
            }else{
                let userId = await f.getUserIdByEmail(req.body.email);
                let id = userId[0].id_user;
                const token = jwt.sign({
                    id_user: id,
                    }, process.env.TOKEN_SECRET)
                        
                resolve(token); 
            }
        }
    })
}
    
       
    
    
   
    

    

    

   









 module.exports = {getUsers, getOneUser, postUser, login}

/*

//GET ALL USERS
server.get("/api/users", (req, res) => {
    db.query('SELECT * FROM users', (error, result) => {
        if (error) {
            console.log("Error connecting to the the DataBase");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
//LOG IN
server.get("/api/login/:id", (req, res) => {
    let userId = req.params.id;
    db.query('SELECT * FROM users WHERE id_user=' + userId, (error, result) => {
        if (error) {
            console.log("User not found");
        } else {
            const token = jwt.sign({
                id_user: userId,
            }, process.env.TOKEN_SECRET);

            res.header('auth-token', token).json({
                typ: "JWT",
                data: { token }
            });
            // res.send({ status: true, data: result})
        }
    });
});
//validate token
server.get("/api/validateToken", (req, res) => {
    let secretJWT = process.env.TOKEN_SECRET;
    const token = req.header('token');
    const verified = jwt.verify(token, secretJWT);

    if (verified) {
        res.send({ status: true, message: "JWT verified" });
    } else {
        res.send({ status: false, message: "Acess Denied" });
    }
});
//GET ONE USER -username and email 
server.get("/api/users/:id", (req, res) => {
    let userId = req.params.id;
    db.query('SELECT * FROM users WHERE id_user=' + userId, (error, result) => {
        if (error) {
            console.log("User not found");
        } else {
            res.send({ status: true, data: { username: result[0].username, email: result[0].email, image: result[0].image } });
        }
    });
});
//UPDATE USERS
server.put("/api/users/update/:id", async (req, res) => {
    let hashedPassword;
    /*TODO in the front wehn update Clicked, we get the user's username, email, have it pre-fill teh form.
    if passowrd input is blank, then *
    //if the user changed the password, then hash and save it, if not, use original one
    let newPassword = req.body.password;
    let newPasswordConfirmed = req.body.passwordConfirmed;

    if (newPassword.length > 0 || newPasswordConfirmed.length > 0) {
        if (newPassword !== newPasswordConfirmed) {
            res.send({ status: false, message: "Passwords Don't Match" });
        } else {
            hashedPassword = await bcryptjs.hash(req.body.password, 8);
        }
    } else {
        db.query(`SELECT password FROM users WHERE id_user='${req.params.id}'`, (error, result) => {
            if (error) {
                res.send({ status: false, message: "Update failed not found" });
            } else {
                hashedPassword = result;
            }
        });
    }

    //actual update
    let sql = `UPDATE users SET username='${req.body.username}', email='${req.body.email}', password='${hashedPassword}',
     image='${req.body.image}' WHERE id_user=${req.params.id}`;

    db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "User Update Failed", error });
        } else {
            res.send({ status: true, message: "User Updated Successfully" });
        }
    });

});
//DELETE USER
server.delete("/api/users/delete/:id", (req, res) => {
    db.query("DELETE FROM users WHERE id_user=" + req.params.id + "", (error) => {
        if (error) {
            res.send({ status: false, message: "User Deletion Failed" });
        } else {
            res.send({ stauts: true, message: "User Deleted Successfully" });
        }
    });
});
*/