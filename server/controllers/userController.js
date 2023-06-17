const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function signupUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  loginUser,
  signupUser,
};
