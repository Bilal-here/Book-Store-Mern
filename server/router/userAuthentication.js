const jwt = require('jsonwebtoken');
const user = require('../models/user');




//Middleware to verify token for authorized user
const authToken =(req,res,next)=>{
const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(' ')[1];

if(token == null){
    return res.status(401).json({message : 'Authorization token required'})
}
jwt.verify(token,process.env.SECRECT_KEY,(err,user)=>{
    if(err){
        return res.status(401).json({message : 'Token expired please sign-in again'})
    }
    req.user = user;
    next()
})

}



// Middleware to verify admin role
const verifyAdmin = async (req, res, next) => {
    try {
      const { id } = req.headers;
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const User = await user.findById(id);
      if (!User) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (User.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
  
      next();
    } catch (error) {
      console.error("Error verifying admin role:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
module.exports = {authToken ,verifyAdmin}