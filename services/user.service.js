const UserRepository = require("../repositories/user.repository");

class UserService {
  static async userExists(userId) {
    return await UserRepository.userExists(userId);
  }

  static async getUserById(userId) {
    return await UserRepository.findUserById(userId);
  }

  static async searchUsers(keyword, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await UserRepository.searchUsers(keyword, limit, skip);
  }

  static async updateFCMToken(userId, token) {
    return await UserRepository.updateFCMToken(userId, token);
  }

  static async removeFCMToken(userId, token) {
    return await UserRepository.removeFCMToken(userId, token);
  }
}

module.exports = UserService;
