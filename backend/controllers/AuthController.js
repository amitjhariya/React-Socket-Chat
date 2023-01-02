import { validationResult } from "express-validator";
import { JWT_SECRET } from "./../configurations/index.js";
import jwt from "jsonwebtoken";
import User from "./../models/Users.js";

export const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { username, name, email, password } = req.body;
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    user = new User({ name, email, password, username });

    await user.save();

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};

export const signIn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne(
      {
        email,
      },
      " _id  email username name role hashed_password salt photo"
    );

    if (!user){
      return  res.status(400).json({
        message: "User with that email does not exist. Please signup.",
      });
    }
      
    // authenticate

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match.",
      });           
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, role,photo } = user;
    res.json({
      success: true,
      token,
      user: { _id, username, name, email, role,photo },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const findUser = async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findOne({ _id: req.user._id });
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
};
