const validateSearchUser = (req, res, next) => {
  const { keyword } = req.query;
  if (!keyword) return next({ status: 400, message: "Keyword is required" });

  next();
}

module.exports = { validateSearchUser }