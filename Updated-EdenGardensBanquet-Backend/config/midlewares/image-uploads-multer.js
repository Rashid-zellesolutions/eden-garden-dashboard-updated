
const multer = require('multer');
const path = require('path');
const fs = require('fs')

const maxSize = 1*1000*1000;

const imageUploadMidleware = (req, res, next) => {
  if(!req.success){
    return res.status(500).json({success: false, message: "image not saved"})
  }
  next();
}

// Generate unique file name with date
const generateUniqueFileName = () => {
  return Date.now() + '_' + Math.floor(Math.random() * 1000);
}

// Filter file type only allowed jpg, jpeg, png
const fileFilter = function(req, file, cb){
  const onlyAllowed = ['image/jpg', 'image/jpeg', 'image/png'];
  if(!onlyAllowed.includes(file.mimetype)){
      return cb(new Error("only allowed JPG, JPEG, PNG file type"))
  }
  cb(null, true);
};

// if directory not exist then create
const ensureDirectoryExist = (directory) => {
  const fullPath = path.resolve(directory);
  if(!fs.existsSync(fullPath)){
    fs.mkdirSync(fullPath, {recursive: true})
  }
}

// Multer configuration for file upload
const dynamicUploads = (dest) => multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join('./uploads', dest);
      ensureDirectoryExist(uploadDir);
      cb(null, uploadDir); // Upload files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
      // Rename uploaded files to avoid name conflicts
        const uniqueName = generateUniqueFileName();
        cb(null, `${uniqueName}_${file.originalname}`)
      
    }
  }),
  limits: {fieldSize: maxSize},
  fileFilter: fileFilter
})

module.exports = dynamicUploads;
