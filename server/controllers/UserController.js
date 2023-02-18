const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });

    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const securePassword = await bcrypt.hash(password, 10); // 10 is the salt

    const user = await User.create({
      email,
      username,
      password: securePassword,
    });
    // delete user.password;
    const data = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    return res.json({ status: true, authToken, isAvatarImageSet: false, username:user.username, email:user.email });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      return res.json({
        status: false,
        msg: "Please login with correct details",
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.json({
        status: false,
        msg: "Please login with correct details",
      });
    }
    const data = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({
      status: true,
      authToken,
      isAvatarImageSet: user.isAvatarImageSet,
      username:user.username,
      email:user.email,
      avatar:user.avatarImage
    });
  } catch (error) {
    console.error(error.message);
    res.json({ status: false, msg: "Internal server error occoured" });
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const user = {
      username: req.user.username,
      email: req.user.email,
      id: req.user.id,
    };
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(user.id, {
      isAvatarImageSet: true,
      avatarImage: avatarImage,
    });
    // console.log(req.body.data.image)
    return res.json({
      isSet: true,
      image: avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.fetchAllUsers = async (req, res, next) => {
  try {
    const user = {
      username: req.user.username,
      email: req.user.email,
      id: req.user.id,
    };

    let users = await User.find({ _id: { $ne: user.id } }).select([
      // Basically selects all except those with id = user.id
      "email",
      "username",
      "avatarImage",
      "id",
    ]); // fetch all users

    // users = users.filter(obj => obj.id !== user.id); // remove current user Alternative slow approach

    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.temp = async (req, res, next) => {
  try {
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id,
    });
    // return res.json({ status: true, authToken });
  } catch (ex) {
    next(ex);
  }
};
