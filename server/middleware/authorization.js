//We use this middleware to authorize the person

const jwt = require("jsonwebtoken");
require("dotenv").config();

//Before it hits the routes, it is going to get access to the req res and if everything is ok it will continue with the process with next to access the routes
module.exports = async(req, res, next) => {
  try {
    // 1. Destructure the token
      const jwtToken = req.header("token");

      if(!jwtToken) {
        return res.status(403).json("Not authorized")
      }

      // 2. Check if token is valid. We call it payload: If it is verified, it is going to return a payload that we can use within our routes.

      const payload = jwt.verify (jwtToken, process.env.jwtSecret);

      res.user = payload.user;


  } catch (err) {
    console.error(err.message)
    return res.status(403).json("Not authorized")
  }
}