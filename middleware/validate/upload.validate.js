const validateUploadImages = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next({ status: 400, message: "No files uploaded." });
  }

  next();
}

module.exports = { 
  validateUploadImages 
}