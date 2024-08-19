import express from 'express';
import {signup,login,userprofile} from '../controllers/user/user-controllers.js';
import { userAuth } from '../middlewares/userAuthMiddleware.js';
import { managerLogin, managerSignup } from '../controllers/Manager-Admin/manager-controllers.js';
import { getallturf } from '../controllers/trufs/turf-controller.js';
import { addReview, deleteReview } from '../controllers/user/review-contoller.js';
import {managerAuth} from "../middlewares/managerAuthMiddleware.js"

const router = express.Router();

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/profile').get( userAuth,userprofile)
router.route('/managersignup').post(managerSignup)
router.route('/managerlogin').post(managerLogin)
router.route('/getallturf').get(getallturf)
router.route('/addreview').post(userAuth,addReview)
router.route('/deletereview:id').delete(managerAuth,deleteReview)

export default router;
