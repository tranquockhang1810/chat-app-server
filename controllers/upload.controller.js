const UploadFacade = require("../facades/upload.facade");
const ResponseFormatter = require("../utils/ResponseFormatter");

exports.uploadImages = async (req, res, next) => {
  try {
    const imageUrls = await UploadFacade.uploadMultiple(req.files);
    res.status(200).json(ResponseFormatter.success(
      imageUrls,
      "Images uploaded successfully",
      200
    ));
  } catch (error) {
    next(error);
  }
}