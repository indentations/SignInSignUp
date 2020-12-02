const jwt = require("jsonwebtoken")
require('dotenv').config()
module.exports= function(req, res, next) {
    try {
        const token =req.header("token")
        if (!token) 
        { 
            return res.status(403).json('Authorization Error!')
        }
        const payload = jwt.verify(token,process.env.jwtSecret)
        req.user = payload.user
        next();
    }
    catch(err)
    {
        console.log(err.message)
        return res.status(401).json('Invalid Token!')
    }
}