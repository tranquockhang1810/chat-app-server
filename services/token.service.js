const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

class TokenService {
  generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });
  }
}

module.exports = new TokenService();
