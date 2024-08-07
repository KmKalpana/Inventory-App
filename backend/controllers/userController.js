const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const Token = require('../models/tokenModel')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
// Generate Token
const generateToken = (id) => {
  // @ts-ignore
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill in all required fields')
  }
  if (password.length < 6) {
    res.status(400)
    throw new Error('Password must be up to 6 characters')
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('Email has already been registered')
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  })

  //   Generate Token
  const token = generateToken(user._id)

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  })

  if (user) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//Login User
const loginUser = asyncHandler(async (req, res) => {
  // res.send("Login User");
  const { email, password } = req.body
  //Validates Request
  if (!email || !password) {
    res.status(400)
    throw new Error('Please Add Email and Password')
  }
  //Check if user Exists
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('User not found! Please Signup')
  }
  //   Generate Token
  const token = generateToken(user._id)

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  })
  //userexists check for password.
  const passwordIsCorrect = await bcrypt.compare(password, user.password)
  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid Email or password')
  }
})
//Logout Function.
const logOut = asyncHandler(async (req, res) => {
  // Send HTTP-only cookie
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: 'none',
    secure: true,
  })
  res.status(200).json({ message: 'Successfully Logged Out.' })
})
// Get User Data
const getUser = asyncHandler(async (req, res) => {
  // @ts-ignore
  const user = await User.findById(req.user._id)

  if (user) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    })
  } else {
    res.status(400)
    throw new Error('User Not Found')
  }
})
//Login Status
// @ts-ignore
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json(false)
  }
  // Verify Token
  // @ts-ignore
  const verified = jwt.verify(token, process.env.JWT_SECRET)
  if (verified) {
    return res.json(true)
  }
  return res.json(false)
})

//Update User
const updateUser = asyncHandler(async (req, res) => {
  // @ts-ignore
  const user = await User.findById(req.user._id)

  if (user) {
    const { name, email, photo, phone, bio } = user
    user.email = email
    user.name = req.body.name || name
    user.phone = req.body.phone || phone
    user.bio = req.body.bio || bio
    user.photo = req.body.photo || photo

    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    })
  res.status(200).send('Update Profile Successfully.')
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
//Change Password
const changePassword = asyncHandler(async (req, res) => {
  // @ts-ignore
  const user = await User.findById(req.user._id)
  const { oldPassword, password } = req.body

  if (!user) {
    res.status(400)
    throw new Error('User not found, please signup')
  }
  //Validate
  if (!oldPassword || !password) {
    res.status(400)
    throw new Error('Please add old and new password')
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password
    await user.save()
    res.status(200).send('Password change successful')
  } else {
    res.status(400)
    throw new Error('Old password is incorrect')
  }
})
//forgot Password
	const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Reset Token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;


  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

   // Save Token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
      <h2>Hello ${user.name}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for only 30minutes.</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <p>Regards...</p>
      <p>Kalpana's Team</p>
    `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});
// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // fIND tOKEN in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });
  // @ts-ignore
  user.password = password;
  // @ts-ignore
  await user.save();
  res.status(200).json({
    message: "Password Reset Successful, Please Login",
  });
});
module.exports = {
  registerUser,
  loginUser,
  logOut,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword
}
