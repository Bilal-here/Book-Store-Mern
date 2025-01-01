const express = require('express')
const router = express.Router()
const {signUp, signIn, authController, updateController, dpUpdate, updatePassword }= require('../controllers/user')
const { authToken } = require('./userAuthentication')
// const multer = require("multer");
const user = require('../models/user')
// const cloudinary = require("../config/cloudinaryconfig");


const { uploadProfile } = require("../config/multerconfig");

router.get('/',(req,res)=>{
    res.send('Hello from server')
})

router.post('/sign-up' ,signUp )
router.post('/sign-in' ,signIn )
router.get('/get-user-details' ,authToken ,authController)
router.put('/update-address' ,authToken ,updateController)
router.put('/update-password' ,authToken ,updatePassword)
router.put( "/profile/update-avatar",
  authToken,
  uploadProfile.single("avatar"),
  dpUpdate)


module.exports = router;



module.exports = router