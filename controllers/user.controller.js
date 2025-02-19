const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const fs = require("fs"); // Thêm để xóa file khi có lỗi
const { validateMinLength } = require("../utils/ValidateModel");

const JWT_SECRET = process.env.JWT_SECRET;

// Register controller
exports.register = async (req, res, next) => {
  let avatarPath = null;
  try {
    const { name, phone, email, birthDate, password } = req.body;

    // Nếu có file ảnh, lưu tạm thời
    if (req.file) {
      avatarPath = `uploads/${req.file.filename}`;
    }

    // Check password
    if (!password || validateMinLength(password, 8) === false) {
      if (avatarPath) {
        fs.unlinkSync(avatarPath); // Xóa ảnh
      }
      return next({ status: 400, message: "Password should be more than 8 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      // Nếu user đã tồn tại, xóa ảnh vừa upload
      if (avatarPath) {
        fs.unlinkSync(avatarPath); // Xóa ảnh
      }
      return next({ status: 400, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ name, phone, email, password: hashedPassword, avatar: avatarPath, birthDate });
    await user.save();

    // Nếu không có lỗi, lưu đường dẫn ảnh vào database
    if (avatarPath) {
      user.avatar = `/uploads/${req.file.filename}`;
      await user.save();
    }

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
          avatar: process.env.BE_ENDPOINT + user.avatar,
          password: undefined,
          __v: undefined
        }
      },
      message: "User registered successfully!"
    });
  } catch (error) {
    // Nếu có lỗi, xóa ảnh đã upload
    if (avatarPath) {
      fs.unlinkSync(avatarPath); // Xóa ảnh
    }
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
          avatar: process.env.BE_ENDPOINT + user.avatar,
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