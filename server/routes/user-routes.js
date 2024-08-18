import express from 'express';
import {signup,login,userprofile} from '../controllers/user/user-controllers.js'
import { userAuth } from '../middlewares/userAuthMiddleware.js';
import { managerLogin, managerSignup } from '../controllers/Manager-Admin/manager-controllers.js';
import { managerAuth } from '../middlewares/managerAuthMiddleware.js';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login)
router.route('/profile').get( userAuth,userprofile)
router.route('/managersignup').post(managerAuth,managerSignup)
router.route('/managerlogin').post(managerAuth,managerLogin)

export default router;
