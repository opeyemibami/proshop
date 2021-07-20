import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'

// @desc auth the user & get token
// @route GET /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc get user prodfile
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = User.findById(req.user._id)
  if (user) {
    res.send(req.user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, getUserProfile }
