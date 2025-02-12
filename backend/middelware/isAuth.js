import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(403).json({
        message: "Please login",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECERET);
    req.user = await User.findById(decode._id);
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(500).json({
      message: "Login first",
    });
  }
};
