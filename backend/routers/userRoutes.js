import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { authenticateUser } from '../middleware/authMiddlewear.js'
const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(authenticateUser, getUserProfile)
  .patch(authenticateUser, updateUserProfile)

export default router
