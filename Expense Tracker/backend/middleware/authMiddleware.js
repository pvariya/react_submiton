const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.authenticate = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
   
    try {
      const decoded = await jwt.verify(token, "jwt_secret");
     
      req.user = await User.findById(decoded.userId);
     
      
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      next();
    } catch (error) {
      
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
