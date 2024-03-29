const cloudinary = require("cloudinary");

exports.uploadFileToCloudinary = async (file, folder) => {
    const options = { folder, resource_type:"raw"};
    return await cloudinary.uploader.upload(file.tempFilePath, oprions);
}