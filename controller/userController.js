const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const httpStatusCode = require("../constant/httpStatusCode");
const UserModel = require("../models/userModel");
const { getToken } = require("../middleware/authMiddleware");
const AdminModel = require("../models/adminModel");
const FarmerModel = require("../models/farmerModel");
const { CreateEmptyCart } = require("../controller/cartController");
const {SendEmail}=require('../services/emailServices');
const registerUser = async (req, res) => {
  try {
    // Validate incoming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { firstname, lastname, username, email, password, phone, role } =
      req.body;

    // Check if user with provided email or phone already exists
    const existingUser = await UserModel.findOne({ email });
    const existingFarmer = await FarmerModel.findOne({ email });
    if (existingUser || existingFarmer) {
      return res.status(httpStatusCode.CONFLICT).json({
        success: false,
        message:
          "User is already registered with this email or phone. Please sign in.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a empty cart
    const cart = await CreateEmptyCart();

    let newUser;
    if (role === "user") {
      // Create new user
      newUser = await UserModel.create({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        phone,
        role: "user",
        cart: cart,
      });
    }else if(role==='farmer'){
      newUser=await FarmerModel.create({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        phone,
        role: "farmer",
      });
    }else {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    // Send a congratulatory email to the user
    SendEmail(email,newUser.username);
    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "User registered successfully!",
      data: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await AdminModel.findOne({ email });
      if(!user){
        user=await FarmerModel.findOne({email});
      }
    }

    if (!user) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email. Please register first!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await getToken(user);

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Successfully logged in!",
      data: { user, token, role: user.role },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const ViewUsers = async (req, res) => {
  try {
    const Users = await UserModel.find();
    if (!Users) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "users are not found",
      });
    }

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "viewd successfully",
      data: Users,
    });
  } catch (error) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong !!",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  ViewUsers,
};
