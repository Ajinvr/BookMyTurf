import express from 'express';
import {signup,login,userProfile, usercheck} from '../controllers/user/user-controllers.js';
import { userAuth } from '../middlewares/userAuthMiddleware.js';
import { addReview} from '../controllers/user/review-contoller.js';


const router = express.Router();

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/profile').get(userAuth,userProfile)
router.route('/addReview').post(userAuth,addReview)
router.route('/userCheck').post(usercheck)

export default router;
