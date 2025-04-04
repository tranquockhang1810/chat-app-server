const UserFacade = require('../facades/user.facade');
const ResponseFormatter = require('../utils/ResponseFormatter');

exports.searchUsers = async (req, res, next) => {
  try {
    const { keyword, page = 1, limit = 10 } = req.query;
    const { users, total } = await UserFacade.searchUsers(keyword, parseInt(page), parseInt(limit));
    res.status(200).json(ResponseFormatter.paginatedList(
      users,
      total,
      page,
      limit,
      "Search users successfully",
      200
    ));
  } catch (error) {
    next(error)
  }
}