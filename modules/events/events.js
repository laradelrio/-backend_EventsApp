const { server } = require('../../server');
const {db} = require('../../db');

const f = require('../users/usersHelperFunctions');
// const f = require('./eventsHelperFunctions')
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

//Get Events by User
function getEventsByUser(userId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT events.*, users.username FROM events LEFT JOIN users ON events.user_id=users.id_user WHERE user_id=' + userId, (error, result) => {
            if (error) {
                reject({ status: false, message: "Unable to get Events by user" });
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


//ADD EVENT
async function postEvent(req) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `INSERT INTO events (name, user_id, category, description, date, time, address, longitude, latitude, image) VALUES ('${req.body.name}','${req.body.user_id}','${req.body.category}','${req.body.description}', '${req.body.date}', '${req.body.time}', '${req.body.address}', '${req.body.longitude}', '${req.body.latitude}','${req.body.image}')`;

            db.query(sql, (error) => {
                if (error) {
                    reject({ status: false, message: "Event Creation Failed", error });
                } else {
                    resolve({ status: true, message: `Event Created Successfully` });
                }
            });
        } catch (error) {
            reject({status: false, message: "Unable to Create Event"});
        }
    }) 
}


//UPDATE EVENT INFO
function updateEvent(eventId, req){
    return new Promise (async(resolve, reject) =>{
        try{
            let changes = f.getChangedFields(req);
            changes.forEach((change) =>{
                db.query(`UPDATE events SET ${Object.keys(change)} ='${Object.values(change)}' WHERE id_event=${eventId}`, (error) => {
                    if (error) {
                        reject({ status: false, message: "Event Update Failed" });
                    } else {
                        resolve({ status: true, message: `Event Updated Successfully` });
                    }
                });        
            })

        }catch(error){
            reject({status: false, message: "Event Update Failed"})
        }
    })
}

//DELETE USER
function deleteEvent(eventId){
    return new Promise ((resolve, reject) =>{
        try{
            db.query(`DELETE FROM events WHERE id_event=`+ eventId , (error) => {
            if (error) {
                reject({ status: false, message: "Event Deletion Failed", error });
            } else {
                resolve({ status: true, message: "Event Deleted Successfully" });
            }
            });
        }catch(error){
            reject({ status: false, message: "Event Deletion Failed", error});
        }     
    })   
}


module.exports = {getEvents, getOneEvent, getEventsByUser, postEvent, updateEvent, deleteEvent}