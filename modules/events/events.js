const { server } = require('../../server');
const {db} = require('../../db');

const f = require('./eventsHelperFunctions');
const { response } = require('express');

const dotenv = require('dotenv');
dotenv.config({path: './.env'}); 

//Get ALL EVENTS
function getEvents() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events', (error, result) => {
            if (error) {
                reject({ status: false, message: "Error connecting to the the DataBase" });
            } else {
                resolve({ status: true, data: result });
            }
        });
    })
}

//GET ONE EVENT
function getOneEvent(id){
    return new Promise((resolve, reject) => {
        try{
            db.query('SELECT * FROM events WHERE id_event=' + id, (error, result) => {
                if (error) {
                    reject({status: false, message: "Event not found"});
                } else {
                    resolve({ status: true, data: result[0] });
                }
            }); 
        }catch(error){
            reject({status: false, message: "Event search failed found"});
        }
    })
}


//ADD USER
async function postEvent(req) {

    // if (await f.isRegistered("email", req.body.email) === true) {
    //     return ({ status: false, message: `Email Already Registered` });
    // }

    // if (await f.isRegistered("username", req.body.username) === true) {
    //     return ({ status: false, message: `Username Taken` });
    // }
 //USER THAT IS CREATING THE EVENT EXISTS -->
    if (f.isSamePassword(req.body.password, req.body.passwordConfirmed) === false) {
        return ({ status: false, message: "Passwords Don't Match" });
    } else {
        return new Promise(async (resolve, reject) => {
            try {
                //CHANGE THIS TO MATCH EVENTS
                let sql = `INSERT INTO users (username, email, password) VALUES ('${req.body.username}','${req.body.email}','${hashedPassword}')`;

                db.query(sql, (error) => {
                    if (error) {
                        reject({ status: false, message: "Event Creation Failed" });
                    } else {
                        resolve({ status: true, message: `Event Created Successfully` });
                    }
                });
            } catch (error) {
                reject("Unable to Create Event");
            }
        })
    }
}

module.exports = {getEvents, getOneEvent, postEvent}