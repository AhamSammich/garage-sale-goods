const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function requireAuth(req, res, next) {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  const token = authorization.split(/\s/, 2)[1]; // 'Bearer coisrfoa...'

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findOne({ _id }).select("_id");

    next();

  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Request is not authorized." });
  }
};

module.exports = requireAuth;