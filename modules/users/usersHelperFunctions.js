const { server } = require('../../server');
const {db} = require('../../db');
 

//TODO REGISTER SCHEMA


function isRegistered(field,input){
   return new Promise((resolve, reject) =>
    db.query(`SELECT ${field} FROM users WHERE ${field}='${input}'`, (error, results) => {
        if (results.length > 0) {
            resolve(true);
        }else{
            resolve(false);
        } 
    }))
}

//Compare two passwords
function isSamePassword(password, passwordConfirmed){
    return ( (password === passwordConfirmed) ? true : false )
}

//get a stored password from a user
function getStoredPassword(email){
    return new Promise ((resolve, reject) => {
        db.query(`SELECT password FROM users WHERE email='${email}'`, (error, results)=>{
            if (error) {
                reject(error);
            }else{
                resolve(results);
            } 
        })
    })
}

//get a stored password from a user
function getUserIdByEmail(email){
    return new Promise ((resolve, reject) => {
        db.query(`SELECT id_user FROM users WHERE email='${email}'`, (error, results)=>{
            if (error) {
                reject(error);
            }else{
                resolve(results);
            } 
        })
    })
}

//get changed fields
function getChangedFields(req){
    let changes = [];
    Object.entries(req.body).forEach(([key, value]) => {
       if(value.length>0){
        changes.push({[key]: value})
        }   
    })
    return changes
}

module.exports = {
    isRegistered, isSamePassword, getStoredPassword, getUserIdByEmail, getChangedFields
}