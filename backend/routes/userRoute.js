import express from 'express';
import { editPassword, editProfile, getAllUsers, getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { adminProtect, protect } from '../middleware/authMiddleware.js';


const router = express.Router();


// router.route('/login').post(loginUser)
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.route('/').get(protect,adminProtect,getAllUsers);
router.route('/profile').get(protect,getUserProfile);
router.route('/profile-edit').put(protect,editProfile);
router.route('/password-edit').put(protect,editPassword);
router.route('/new').post(registerUser);

export default router;