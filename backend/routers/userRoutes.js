import express from 'express'
import { authUser, getUserProfile } from '../controllers/userController.js'
import {authenticateUser} from '../middleware/authMiddlewear.js'
const router = express.Router()

router.post('/login', authUser)
router.route('/profile').get(authenticateUser,getUserProfile)

export default router
