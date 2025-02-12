import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middelware/sendMail.js";

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
      });
    }
    const otp = Math.floor(Math.random() * 1000000);

    const verifyToken = await jwt.sign(
      { user, otp },
      process.env.ACTIVATION_SEC,
      {
        expiresIn: "5m",
      }
    );

    await sendMail(email, "VarunChatBot", otp);
    res.json({
      message: "OTP sent to your email",
      verifyToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;
    const verify = await jwt.verify(verifyToken, process.env.ACTIVATION_SEC);
    if (!verify) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }
    if (verify.otp !== otp) {
      return res.status(400).json({
        message: "Invalid otp",
      });
    }
    const token = jwt.sign({ _id: verify.user._id }, process.env.JWT_SECERET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Loggd in successfully",
      user: verify.user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
