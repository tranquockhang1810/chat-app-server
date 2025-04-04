const AuthFacade = require("../facades/auth.facade");
const ResponseFormatter = require("../utils/ResponseFormatter");

exports.register = async (req, res, next) => {
  try {
    const { name, phone, email, birthDate, password } = req.body;
    const avatar = req.file;

    const { user, accessToken } = await AuthFacade.register({ name, phone, email, birthDate, password, avatar });

    res.status(201).json(ResponseFormatter.success(
      { accessToken, user: ResponseFormatter.formatUser(user._doc) },
      "User registered successfully",
      201
    ));
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const { user, accessToken } = await AuthFacade.login(phone, password);

    res.status(201).json(ResponseFormatter.success(
      { accessToken, user: ResponseFormatter.formatUser(user._doc) },
      "Login successfully",
      200
    ));
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};
