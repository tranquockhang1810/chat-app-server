const UploadService = require("../services/upload.service");

class UploadFacade {
  static uploadToCloudinary(fileBuffer) {
    return UploadService.uploadToCloudinary(fileBuffer);
  }

  static uploadMultiple(files) {
    return UploadService.uploadMultiple(files);
  }
}

module.exports = UploadFacade;