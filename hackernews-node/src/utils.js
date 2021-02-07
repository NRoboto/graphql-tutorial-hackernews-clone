const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some"; // <-- Bad!

const getUserId = (req, authToken) => {
  const token = req
    ? req.headers.authorization.replace("Bearer ", "")
    : authToken;
  if (!token) throw new Error("Not authenticated");

  return jwt.verify(token, APP_SECRET).userId;
};

module.exports = {
  APP_SECRET,
  getUserId,
};
