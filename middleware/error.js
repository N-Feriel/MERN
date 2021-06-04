module.exports = function (error, req, res, next) {
  res.locals.message = error.message;

  res.status(500).json({
    status: 500,
    message: "somthing failed",
  });
};
