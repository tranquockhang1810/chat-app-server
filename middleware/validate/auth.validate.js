const {
  validateEmail,
  validateLength,
  validateMinLength,
  validateBirthDate
} = require("../../utils/ValidateModel");
const ALLOWED_IMAGE_TYPES = require("../../consts/ImagesAllowedType");

const validateRegister = (req, res, next) => {
  const { name, phone, email, birthDate, password } = req.body;
  const avatar = req.file;
  
  if (!name || !validateMinLength(name, 3)) {
    return next({ status: 400, message: "Name should be at least 3 characters" });
  }

  if (!phone || !validateLength(phone, 10)) {
    return next({ status: 400, message: "Phone should be exactly 10 characters" });
  }

  if (!email || !validateEmail(email)) {
    return next({ status: 400, message: "Invalid email format" });
  }

  if (!password || !validateMinLength(password, 8)) {
    return next({ status: 400, message: "Password should be at least 8 characters" });
  }

  if (!birthDate || !validateBirthDate(birthDate)) {
    return next({ status: 400, message: "Birth date should be in the past." });
  }

  if (!avatar) {
    return next({ status: 400, message: "Avatar image is required" });
  }
  
  if (!ALLOWED_IMAGE_TYPES.includes(avatar.mimetype)) {
    return next({ status: 400, message: "Invalid avatar format. Only JPG, JPEG, and PNG are allowed." });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !validateLength(phone, 10)) {
    return next({ status: 400, message: "Invalid phone number" });
  }

  if (!password) {
    return next({ status: 400, message: "Password is required" });
  }

  next();
};

module.exports = { validateRegister, validateLogin };
