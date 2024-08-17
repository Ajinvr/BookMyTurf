import express from 'express';
import {signup,login,userprofile} from '../controllers/user/user-controllers.js'
import { userAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login)
router.route('/profile').get( userAuth,userprofile)

export default router;
