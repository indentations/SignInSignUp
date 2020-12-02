const {Pool} =require('pg')
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    port:"5432",
    password:"0506",
    database: "projectdb",
});
module.exports = pool


// CREATE DATABASE projectdb;

// CREATE TABLE users(user_id serial NOT NULL PRIMARY KEY, user_email VARCHAR(255) NOT NULL UNIQUE,
// user_password VARCHAR(255) NOT NULL);