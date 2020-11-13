/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const { json } = require("express");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(req.headers);
  if (!token) {
    console.log(token);
    return res
      .status(401)
      .json({ message: "Connection refused bc you do not have a token" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Your token is bad" });
    }
    console.log("decoded token ->", decoded);
    next();
  });
};
