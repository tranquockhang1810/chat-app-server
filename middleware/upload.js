const multer = require("multer");
const slugify = require("slugify");

const removeVietnameseTones = (str) => {
  return slugify(str, { lower: true });
};

// Cấu hình lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Lưu file vào thư mục 'uploads'
  },
  filename: (req, file, cb) => {
    // Loại bỏ dấu và ký tự đặc biệt trong tên file
    const sanitizedFilename = removeVietnameseTones(file.originalname);
    cb(null, Date.now() + "-" + sanitizedFilename);
  },
});

// Bộ lọc file (chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
