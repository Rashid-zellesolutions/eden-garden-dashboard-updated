const sharp = require('sharp');

const validateImageDiemensions = async(file) => {
    const metadeta = await sharp(file.path).metadata();
    if(metadeta.width > 120 || metadeta.height > 120){
        throw new Error("Image diementions must be square and 120x120");
    }
}

module.exports = validateImageDiemensions;