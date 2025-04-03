const UserService = require("../services/user.service"); 

class UserFacade {
  static async searchUsers(keyword, page, limit) {
    return await UserService.searchUsers(keyword, page, limit);
  }
}

module.exports = UserFacade;