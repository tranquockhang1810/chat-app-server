// Validate Email
const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

// Validate Length
const validateLength = (value, length) => {
  return value.length === length;
}

const validateMinLength = (value, min) => {
  return value.length >= min;
}

const validateMaxLength = (value, max) => {
  return value.length <= max;
}

const validateBirthDate = (birthDate) => {
  const today = new Date();
  // Tách chuỗi theo định dạng DD-MM-YYYY
  const [day, month, year] = birthDate.split("-").map(Number);

  // Tạo đối tượng Date từ thông tin đã tách
  const formattedDate = new Date(year, month - 1, day);

  // Kiểm tra ngày có hợp lệ không (không lớn hơn hôm nay)
  return formattedDate <= today;
};

module.exports = {
  validateEmail,
  validateLength,
  validateMinLength,
  validateMaxLength,
  validateBirthDate
}