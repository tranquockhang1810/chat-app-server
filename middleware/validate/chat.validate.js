const UserService = require("../../services/user.service");

const validateGetChatParams = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return next({ status: 400, message: "Invalid user ID format" });
    }

    const userExists = await UserService.userExists(userId);
    if (!userExists) {
      return next({ status: 404, message: "User not found" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateGetChatParams };
