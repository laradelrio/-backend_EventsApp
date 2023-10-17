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

function isSamePassword(password, passwordConfirmed){
    return ( (password === passwordConfirmed) ? true : false )
}




module.exports ={
    isRegistered, isSamePassword
}