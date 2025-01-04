const cloudinary = require("../config/cloudinaryconfig");
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


//Sign-Up handle
const signUp = async (req, res) => {
    try {
      const { username, password, address, role } = req.body;
      const email = req.body.email.toLowerCase()
     
  
      // Check if email is provided
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      // Validate username length
      if (username.length < 4) {
        return res
          .status(400)
          .json({ message: "Username length should be at least 4" });
      }
  

  
      // Check if username already exists
      const existingUsername = await User.findOne({ username : username });
      if (existingUsername) {
        return res
          .status(400)
          .json({ message: "Username already taken" });
      }
     
  
      // Check if email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res
          .status(400)
          .json({ message: "Email already registered" });
      }
      
      // Validate password length
      if (password.length <= 5) {
        return res
          .status(400)
          .json({ message: "Password should be at least 6 characters long" });
      }
     
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

  
      // Create the new user
      if (!email || email.trim() === "") {
        return res.status(400).json({ message: "Email is required and cannot be empty." });
      }
      
      const newUser = await User.create({
        username : username,
        email : email,
        password: hashedPassword,
        address : address,
        role : role,
      });
     
  
      if (newUser) {
        return res.status(201).json({ message: "User created successfully" });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };

  
  



    //Sign-in handle
    const signIn = async(req,res)=>{
       try{ 
        
        const password = req.body
        const email = req.body.email.toLowerCase()

        const verifyUser = await User.findOne({email:email})
        if(!verifyUser){
            res
            .status(400)
            .json({message : 'User does not exits need to register'})
        }   
       
        bcrypt.compare(password , verifyUser.password ,(err,data)=>{
            if(data){
                const authClaims =[
                    {email : verifyUser.email},
                    {role : verifyUser.role}
                ]
                const token = jwt.sign({authClaims} ,process.env.SECRECT_KEY,{
                    expiresIn : '1d'
                } )
                res.status(200).json({id:verifyUser._id , role:verifyUser.role ,token : token})
            }
            else{
                res.status(400).json({message: 'invalid Username or Password'})
            }
        })
       }
        catch(error){
            res.status(500).json({messgae : 'Internal server error'})
        }


    }

    

    //Getting user information mainly for profile page
    const authController = async(req,res)=>{
        try {
         const {id} = req.headers
         const data = await User.findById(id).select('-password')
         return res.status(200).json(data)
         } catch (error) {
             res.status(500).json({message:'Internal server error'})
         }
     }  



     //Address update
     const updateController = async(req,res)=>{
        try {
         const {id} = req.headers
         const {address} = req.body
         await User.findByIdAndUpdate(id,{address:address});
         return res.status(200).json({message:'Adress updated succesfully'})
        } catch (error) {
            res.status(500).json({message : 'Internal server error'})
        }
        }




      //Password update 
        const updatePassword = async(req,res)=>{
          try {
            const {id} = req.headers
            const {oldPassword , newPassword} = req.body
            const user = await User.findById(id)
            const verified  = await bcrypt.compare(oldPassword , user.password)
            if(verified) {
            const hashedPassword = await bcrypt.hash(newPassword , 10)
            user.password = hashedPassword
            await user.save()
           
            res.status(200).json({message : 'Password updated succesfully'})}
            else{
              res.status(400).json({message : "Unable to change the password"})
            }
          } catch (error) {
            console.log(error)
          }
        }





      //profile photo update
      const dpUpdate = async (req, res) => {
        try {
          // Ensure req.user is populated correctly via authToken middleware
          const email = req.user.authClaims.find(claim => claim.email)?.email;
      
          if (!email) {
            return res.status(401).json({ message: "Unauthorized user" });
          }
      
          // Check if file is uploaded
          if (!req.file) {
            return res.status(400).json({ message: "Avatar file is required" });
          }
      
          // Upload to Cloudinary
          const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: "avatars",
          });
          
          // Use the URL from Cloudinary response
          const avatarUrl = cloudinaryResponse.url;
          console.log("Uploaded Avatar URL:", avatarUrl);
      
          // Update user avatar in the database using email
          const updatedUser = await User.findOneAndUpdate(
            { email },
            { avatar: avatarUrl },
            { new: true } // Return the updated document
          );
      
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
          }
      
          // Successfully updated user avatar
          return res.status(200).json({
            message: "Avatar updated successfully",
            user: updatedUser,
          });
        } catch (error) {
          console.error("Error updating avatar:", error.message);
          return res.status(500).json({ message: "Internal server error" });
        }
      };
      
      
    
    
    
    module.exports = {signUp,signIn,authController,updateController,dpUpdate,updatePassword}