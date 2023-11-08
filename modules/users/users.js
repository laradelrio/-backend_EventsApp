const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { server } = require('../../server');
const { db } = require('../../db');

const f = require('./usersHelperFunctions');
const { response } = require('express');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

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
function getOneUser(id) {
    return new Promise((resolve, reject) => {
        try {
            db.query('SELECT * FROM users WHERE id_user=' + id, (error, result) => {
                if (error) {
                    reject({ status: false, message: "User not found" });
                } else {
                    resolve({ status: true, data: { username: result[0].username, email: result[0].email, image: result[0].image } });
                }
            });
        } catch (error) {
            reject({ status: false, message: "User search failed found" });
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
                        resolve({ status: true, message: `User Created Successfully` });
                    }
                });
            } catch (error) {
                reject("Unable to Create User");
            }
        })
    }
}

//LOG IN
async function login(req) {
    return new Promise(async (resolve, reject) => {
        if (await f.isRegistered("email", req.body.email) === false) {
            reject({ status: false, message: `No account associated to this email` });
        } else {
            let storedPassword = await f.getStoredPassword(req.body.email);
            let isPasswordValid = await bcryptjs.compare(req.body.password, storedPassword[0].password);

            if (!isPasswordValid) {
                reject({ status: false, message: "Incorrect Password" });
            } else {
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

//validate token
function validateToken(token) {
    return new Promise((resolve, reject) => {
        if (token === null) {
            reject({ status: false, message: "Access Denied" })
        }
        let secretJWT = process.env.TOKEN_SECRET;
        const verified = jwt.verify(token, secretJWT);

        if (verified) {
            resolve({ status: true, message: "JWT verified" });
        } else {
            reject({ status: false, message: "Access Denied" });
        }
    })
}


//UPDATE USERS INFO
function updateUser(id, req) {
    return new Promise(async (resolve, reject) => {
        try {
            let changes = f.getChangedFields(req);

            changes.forEach((change) => {
                db.query(`UPDATE users SET ${Object.keys(change)} ='${Object.values(change)}' WHERE id_user=${id}`, (error) => {
                    if (error) {
                        reject({ status: false, message: "User Update Failed" });
                    } else {
                        resolve({ status: true, message: `User Updated Successfully` });
                    }
                });
            })

        } catch (error) {
            reject({ status: false, message: "User Update Failed" })
        }

    })
}

function updateUserPassword(id, req) {
    return new Promise(async (resolve, reject) => {
        try {

            if (f.isSamePassword(req.body.password, req.body.passwordConfirmed) === true) {
                let hashedPassword = await bcryptjs.hash(req.body.password, 8);

                db.query(`UPDATE users SET password ='${hashedPassword}' WHERE id_user=${id}`, (error) => {
                    if (error) {
                        reject({ status: false, message: "Password Update Failed" });
                    } else {
                        resolve({ status: true, message: `Password Updated Successfully` });
                    }
                });
            } else {
                reject({ status: false, message: "Passwords don't match" })
            }


        } catch (error) {
            reject({ status: false, message: "Password Update Failed" })
        }

    })
}

//DELETE USER
function deleteUser(userId) {
    return new Promise((resolve, reject) => {
        try {
            db.query("DELETE FROM users WHERE id_user=" + userId + "", (error) => {
                if (error) {
                    reject({ status: false, message: "User Deletion Failed" });
                } else {
                    resolve({ status: true, message: "User Deleted Successfully" });
                }
            });
        } catch (error) {
            reject({ status: false, message: "User Deletion Failed" });
        }
    })
}

module.exports = { getUsers, login, getOneUser, postUser, validateToken, updateUser, updateUserPassword, deleteUser }

