module.exports = function (req, res, next) {
  if (!req.UserClient.isAdmin)
    return res.status(403).json({
      status: 403,
      message: "Access Denied",
    });
  next();
};
