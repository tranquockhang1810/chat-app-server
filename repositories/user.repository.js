const User = require("../models/users.model");

class UserRepository {
  async createUser(data) {
    return await User.create(data);
  }

  async findUserByPhone(phone) {
    return await User.findOne({ phone });
  }

  async findUserById(id) {
    return await User.findById(id);
  }
}

module.exports = new UserRepository();
