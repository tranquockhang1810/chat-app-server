const bcrypt = require("bcryptjs");
const UserRepository = require("../repositories/user.repository");
const TokenService = require("./token.service");
const AvatarService = require("./avatar.service");

class AuthService {
  async register(userData) {
    const { name, phone, email, birthDate, password, avatar } = userData;

    const hashedPassword = await this.hashPassword(password);

    let avatarUrl = "";
    if (avatar) {
      avatarUrl = await AvatarService.uploadToCloudinary(avatar.buffer, avatar.originalname);
    }

    const user = await UserRepository.createUser({
      name,
      phone,
      email,
      birthDate,
      password: hashedPassword,
      avatar: avatarUrl,
    });

    const accessToken = TokenService.generateToken(user._id);

    return { user, accessToken };
  }

  async login(phone, password) {
    const user = await UserRepository.findUserByPhone(phone);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid phone or password");

    const accessToken = TokenService.generateToken(user._id);

    return { user, accessToken };
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}

module.exports = new AuthService();
