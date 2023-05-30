import db from '../models/index.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from '../utils/error.js';
const userTable = db.user;

export const login = async (req, res, next) => {
  try {
    const user = await userTable.findOne({where:{email: req.body.email}});
    if(!user)
      next(createError(404, "User not found!"));
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect)
      next(createError(400, "Password is Incorrect!"));
    const token = jwt.sign(
      {id: user.id, isAdmin: user.role === 'admin'},
      "Thisisveryveryverysecretkey"
    );
    const { password,role, ...otherDetail } = user.dataValues;
    res
      .cookie("access_token", token, { httpOnly: false })
      .status(200)
      .json(otherDetail);

  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      let userObj = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        username: req.body.username,
        role: req.body.role,
      };
      const createdUser = await userTable.create(userObj);
      res.status(200).send(createdUser);
    } catch (error) {
      res.status(500).send(error);
    }
};

export const signout = async (req, res, next) => {
  try {
    res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Signout successful!" });
  } catch (error) {
    next(error);
  }
}
