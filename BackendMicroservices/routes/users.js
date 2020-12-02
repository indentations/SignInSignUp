const router=require('express').Router()
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const pool =require('../db');
const ValidUser=require("../midleware/validuser");
const authorization=require("../midleware/authorization");
router.post("/register", ValidUser, async (req, res) => {

    try{
        // destructring 
        const { email,password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        // res.json(user.rows)
        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
          }
          const salt = await bcrypt.genSalt(10);
          const bcryptPassword = await bcrypt.hash(password, salt);
          let newUser = await pool.query(
            "INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING *",[ email, bcryptPassword]
          );
          const token = jwtGenerator(newUser.rows[0].user_id);
          return res.json({ token });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error?");
      }
}
);


//Login Router
router.post("/login",ValidUser, async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
  
      const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
    //   console.log(validPassword)
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const token = jwtGenerator(user.rows[0].user_id);
      return res.json({ token });
    }
     catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }); 
  
  router.get("/verify", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.user.id])
      // res.json(true);
      res.json(user.rows[0]);
    } 
    catch (err) 
    {
      console.error(err.message);
      res.status(500).send("Server error!");
    }
  });

module.exports=router

// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
