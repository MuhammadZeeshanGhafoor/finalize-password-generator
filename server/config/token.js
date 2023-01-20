const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.SECRET;
function generateToken(userId) {
  // console.log(JWT_SECRET);
  return jwt.sign(userId, JWT_SECRET);
}

const verifyToken = (req, res, next) => {
  const decode = jwt.verify(
    // req.body.headers["Authorization"].split(" ")[1],
    req.body.headers.token,
    JWT_SECRET
  );
  // console.log("token from frontend", decode);
  // console.log(decode);
  if (decode) {
    next();
//     res.send({ decode });
  } else {
    res.status(401).send({ message: "Invalid token" });
  }
};


module.exports = {generateToken, verifyToken}