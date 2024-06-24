const multer = require('multer');
const path = require('path');
const fs = require('fs');

// const imageUploadMidleware = (req, res, next) => {
//     if(!req.success){
//         return res.status(500).json({success: false, message: "image not saved"})
//     }
//     next()
// }

const generateUniqueFileName = () => {
    return Date.now() + '_' + Math.floor(Math.random() * 1000);
}

const ensureDirectoryExist = (directory) => {
    const fullPath = path.resolve(directory);
    if(!fs.existsSync(fullPath)){
      fs.mkdirSync(fullPath, {recursive: true})
    }
}


const dynamicMulter = (dest, fieldName, maxCount, allowedType, maxSize) => {
    console.log(dest, fieldName, maxCount, allowedType, maxSize);
    const fileFilter = function(req, file, cb){
        if(!allowedType.includes(file.mimetype)){
            return cb(new Error("Only Allowed Types are JPG JPEG PNG"));
        }
        cb(null, true);
    }
    
    return multer({
        storage: multer.diskStorage({
            destination: function(req, file, cb){
                const uploadDir = path.join('./uploads', dest);
                ensureDirectoryExist(uploadDir);
                cb(null, uploadDir)
            },
            filename: function(req, file, cb){
                    const uniqueName = generateUniqueFileName();
                    cb(null, `${uniqueName}_${file.originalname}`)
                    
            }
        }),
        limits: {fieldSize: maxSize},
        fileFilter: fileFilter,
    }).fields(fieldName.map(name => ({name, maxCount})))

}

const handleFaildRequest = (req, res, next) => {
    if(!req.success && req.files){
        Object.keys(req.files).forEach(fieldName => {
            req.files[fieldName].forEach(file => {
                fs.unlinkSync(file.path)
            })
        });
    }
    next()
}

module.exports = { dynamicMulter, handleFaildRequest}