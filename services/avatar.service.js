const cloudinary = require("../config/cloudinary");
const { v4: uuidv4 } = require("uuid");

class AvatarService {
  static async uploadToCloudinary(fileBuffer) {
    return new Promise((resolve, reject) => {
      const uniqueFilename = uuidv4();

      cloudinary.uploader.upload_stream(
        {
          folder: "chat-app",
          format: "png",
          public_id: uniqueFilename,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url); // Trả về URL ảnh trên Cloudinary
        }
      ).end(fileBuffer);
    });
  }
}

module.exports = AvatarService;
