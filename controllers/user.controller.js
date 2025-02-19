const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const { validateEmail, validateMinLength, validateLength, validateBirthDate } = require("../utils/ValidateModel");
const JWT_SECRET = process.env.JWT_SECRET;

// Register controller
exports.register = async (req, res, next) => {
  try {
    const { name, phone, email, birthDate, password } = req.body;
    const avatar = req.file ? req.file.path : null;

    // Validate name
    if (!name || validateMinLength(name, 3) === false) {
      return res.status(400).json({
        code: 400,
        message: "Name should be at least 3 characters"
      });
    }

    // Validate phone
    if (!phone || validateLength(phone, 10) === false) {
      return res.status(400).json({
        code: 400,
        message: "Phone should be exactly 10 characters"
      });
    }

    // Validate email
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        code: 400,
        message: "Invalid email format"
      });
    }

    // Validate password
    if (!password || validateMinLength(password, 8) === false) {
      return res.status(400).json({
        code: 400,
        message: "Password should be at least 8 characters"
      });
    }

    // Validate birthDate
    if (!birthDate || !validateBirthDate(birthDate)) {
      return res.status(400).json({
        code: 400,
        message: "Birth date should be in the past."
      });
    }

    // Validate avatar
    if (!req.file) {
      return res.status(400).json({
        code: 400,
        message: "Avatar image is required"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ name, phone, email, password: hashedPassword, avatar, birthDate });
    await user.save();

    // Generate JWT token
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      data: {
        accessToken,
        user: {
          ...user._doc,
          id: user._id,
          _id: undefined,
          password: undefined,
          __v: undefined
        }
      },
      message: "User registered successfully!"
    });
  } catch (error) {
    next({ status: 500, message: error?.message });
  }
};

// Login controller
exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return next({ status: 400, message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next({ status: 400, message: "Invalid phone or password" });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      data: {
        accessToken,
        user: {
          ...user._doc,
          id: user._id,
          _id: undefined,
          password: undefined,
          __v: undefined
        }
      },
      message: "Login successfully"
    });
  } catch (error) {
    next({ status: 500, message: error?.message });
  }
};