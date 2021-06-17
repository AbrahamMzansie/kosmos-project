const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const generateToken = require("../token/generateToken");

//@desc : auth user && login user
//@route : GET /api/users/login
//@access : public access
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (!user.isAdmin) {
      res.status(400);
      throw new Error(`User with name ${user.nameHandler} is not approved`);
    }
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      nameHandler: user.nameHandler,
      email: user.email,
      address: user.address,
      userType: user.userType,
      contactNumber: user.contactNumber,
      admin: user.isAdmin,
      image: user.image,
      approved: user.approved,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc : register a new user
//@route : POST /api/users
//@access : public access
const registerUser = asyncHandler(async (req, res) => {
  const {
    nameHandler,
    email,
    password,
    address,
    userType,
    contactNumber,
    admin,
    image,
  } = req.body;
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error(`User with email ${email} already exist`);
  } else {
    const user = await User.create({
      nameHandler,
      email,
      password,
      address,
      userType,
      contactNumber,
      isAdmin: admin,
      image,
      approved: false,
    });
    if (user) {
      res.status(201).json({
        nameHandler: user.nameHandler,
        _id: user._id,
        email: user.email,
        address: user.address,
        userType: user.userType,
        contactNumber: user.contactNumber,
        admin: user.isAdmin,
        image: user.image,
        approved: user.approved,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error(`Invalid data`);
    }
  }
});

//@desc : register a new admin user
//@route : POST /api/admin/users
//@access : public access
const registerAdminUser = asyncHandler(async (req, res) => {
  const {
    nameHandler,
    email,
    password,
    address,
    userType,
    contactNumber,
    admin,
    image,
  } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error(`User with email ${email} already exist`);
  } else {
    const user = await User.create({
      nameHandler,
      email,
      password,
      address,
      userType,
      contactNumber,
      isAdmin: admin,
      image,
      approved: admin ? true : false,
    });
    if (user) {
      res.status(201).json({
        nameHandler: user.nameHandler,
        _id: user._id,
        email: user.email,
        address: user.address,
        userType: user.userType,
        contactNumber: user.contactNumber,
        admin: user.isAdmin,
        image: user.image,
        approved: user.approved,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error(`Invalid data`);
    }
  }
});

//@desc : get user profile
//@route : GET /api/users/profile
//@access : private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc : get all users
//@route : GET /api/users
//@access : Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false });
  res.json(users);
});

//@desc : get user by id
//@route : GET /api/users/:id
//@access : Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc : update user
//@route : PUT /api/users/:id
//@access : private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.nameHandler = req.body.nameHandler || user.nameHandler;
    user.email = req.body.email || user.email;
    user.contactNumber = req.body.contactNumber || user.contactNumber;
    user.image = req.body.image || user.image;
    user.adddress = req.body.address || user.address;
    user.userType = req.body.userType || user.userType;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.approved = req.body.approved || user.approved;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      nameHandler: updatedUser.nameHandler,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      image: updatedUser.image,
      contactNumber: updatedUser.contactNumber,
      adddress: updatedUser.adddress,
      userType: updatedUser.userType,
      approved: updatedUser.approved,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc : update user profile
//@route : PUT /api/users/profile
//@access : private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.nameHandler = req.body.nameHandler || user.nameHandler;
    user.email = req.body.email || user.email;
    user.contactNumber = req.body.contactNumber || user.contactNumber;
    user.image = req.body.image || user.image;
    user.address = req.body.address || user.address;
    user.userType = req.body.userType || user.buserType;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.approved = req.body.approved || user.approved;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      nameHandler: updatedUser.nameHandler,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      image: updatedUser.image,
      contactNumber: updatedUser.contactNumber,
      adddress: updatedUser.adddress,
      userType: updatedUser.userType,
      isAdmin: updatedUser.isAdmin,
      approved: updatedUser.approved,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc : APPROVE A USER
//@route : GET /api/users/:userid
//@access : private
const approverUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.updateOne({ _id: user._id }, { $set: { approved: true } });
    const users = await User.find({ isAdmin: false });
    res.json(users);
  }
});

module.exports = {
  authUser: authUser,
  getUserProfile: getUserProfile,
  registerUser: registerUser,
  registerAdminUser: registerAdminUser,
  updateUserProfile: updateUserProfile,
  getUsers: getUsers,
  getUserById: getUserById,
  updateUser: updateUser,
  approverUser: approverUser,
};
