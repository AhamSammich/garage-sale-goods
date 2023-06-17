const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// static login method
userSchema.statics.login = async function (email, password) {
    // validation
    if (!email || !password) {
      throw Error("All fields must be filled.");
    }

    // get user
    const user = await this.findOne({ email });
    if (!user) {
      throw Error("Incorrect email");
    }

    // check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
}

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please provide a valid email address.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Please provide a stronger password.");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use.");
  }

  // generate hash
  const hash = await hashPassword(password);

  // create new user
  const user = await this.create({
    email,
    password: hash,
  });
  return user;
};

module.exports = mongoose.model("User", userSchema);
