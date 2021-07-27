import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'

// @desc register a new user prodfile
// @route GET /api/users/
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('Sorry, this email has already beeen used')
  }
  const user = await User.create({ email, password, name })
  if (user) {
    res.status(201).json({ ...user._doc, token: generateToken(user._id) })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc auth the user & get token
// @route GET /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
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

// @desc update user profile
// @route PATCH /api/users
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  )
  if (!isValidUpdate) {
    return res.status(400).send('invalid update')
  }

  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  updates.forEach((update) => {
    user[update] = req.body[update]
  })

  const updatedUser = await user.save()
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id),
  })
})

export { registerUser, authUser, getUserProfile, updateUserProfile }
