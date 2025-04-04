const ChatFacade = require("../facades/chat.facade");
const ResponseFormatter = require("../utils/ResponseFormatter");

exports.getChatMessages = async (req, res, next) => {
  try {
    const user1Id = req.user.userId;
    const user2Id = req.params.userId;
    let { page, limit } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    const { chat, messages, total } = await ChatFacade.getChatMessages(user1Id, user2Id, page, limit);
    res.status(200).json(ResponseFormatter.paginatedList(
      { chat, messages },
      total,
      page,
      limit,
      "Get chat successfully",
      200
    ));
  } catch (error) {
    next(error);
  }
};

exports.getChatList = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    let { page, limit } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    const { chats, total } = await ChatFacade.getChatList(userId, page, limit);
    res.status(200).json(ResponseFormatter.paginatedList(
      chats,
      total,
      page,
      limit,
      "Get chat successfully",
      200
    ));
  } catch (error) {
    next(error);
  }
};
