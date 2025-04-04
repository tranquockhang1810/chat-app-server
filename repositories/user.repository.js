const User = require("../models/users.model");

class UserRepository {
  static async createUser(data) {
    return await User.create(data);
  }

  static async findUserByPhone(phone) {
    return await User.findOne({ phone });
  }

  static async findUserById(id) {
    return await User.findById(id).lean();
  }

  static async userExists(id) {
    return await User.exists({ _id: id });
  }

  static async searchUsers(keyword, limit = 10, skip = 0) {
    const query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Tìm theo tên (không phân biệt hoa thường)
        { phone: { $regex: keyword, $options: "i" } } // Tìm theo số điện thoại
      ],
    };

    const [users, total] = await Promise.all([
      User.find(query)
        .limit(limit)
        .skip(skip)
        .select("name phone avatar")
        .lean(),
      User.countDocuments(query),
    ]);

    return { users, total };
  }

  static async updateFCMToken(userId, token) {
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { fcmTokens: token } },
      { new: true }
    );
  }

  static async removeFCMToken(userId, token) {
    return await User.findByIdAndUpdate(
      userId,
      { $pull: { fcmTokens: token } },
      { new: true }
    );
  }
}

module.exports = UserRepository;
