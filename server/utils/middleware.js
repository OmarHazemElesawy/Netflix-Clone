const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");

//JWT VERIFICATION
const verifyUser = (req, res, next) => {
  const userJwtHeader = req.headers.token;
  if (!userJwtHeader)
    throw new ExpressError("You Are not authorized", 401);
  const token = userJwtHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) throw new ExpressError("Token not valid", 403);
    req.user = user;
    next();
  });
};

module.exports = verifyUser;
