const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryconfig");

// Configure Cloudinary Storage for books
const bookStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'books',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
  },
});

// Configure Cloudinary Storage for profile pictures
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profile',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
 
});


// Multer middleware
const uploadBook = multer({ storage: bookStorage });
const uploadProfile = multer({ storage: profileStorage });

module.exports = { uploadBook, uploadProfile };
