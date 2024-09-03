import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { user } from "../../db/models/userModel.js"
import { order } from '../../db/models/orderModel.js';
import { turf } from '../../db/models/turfModel.js'
const salt = 10;


const tokengenerate = async (email,id) => {
 const token = await jwt.sign({email, id }, process.env.jWTKEY);
  return token;
};



// signup ====

const signupValidators = [
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim(),
];

export const signup = async (req, res) => {
  await Promise.all(signupValidators.map(validator => validator.run(req)));
       const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
                const { email, password } = req.body;
                      try { 
                             let isExistinguser  = await user.findOne({ email })                               
                               
                               
                              if (isExistinguser != null) return res.status(409).json({msg:"user already exists", ts:"error"})
                                
                              const hashedPassword = await bcrypt.hash(password,salt);

                              let newuser = await user.create({email,password:hashedPassword})
                              let id = newuser._id
                              
                              let token = await tokengenerate(email,id)


                         res.status(201).cookie("token",token).json({ msg: 'Sign up successful' ,ts:"success",email,id,token});
                       } catch (error) {
                         res.status(500).json({ msg : 'Server error try again' ,ts:"error" });
                       }
};


// login ====
const loginValidators = [
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').trim(),
];

export const login = async (req, res) => {
      await Promise.all(loginValidators.map(validator => validator.run(req)));
           const errors = validationResult(req);
                 if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
            try {
                 let Existinguser = await user.findOne({ email });
                   
                      if (Existinguser == null ) return res.status(401).json({ msg: "User doesn't exist", ts: "error" });
                       
                           const isMatch = await bcrypt.compare(password, Existinguser.password);
                            
                                if (!isMatch) return res.status(401).json({ msg: "Invalid credentials", ts: "error" });
                               
                                  
                                   let id = Existinguser._id 
                                   let token = await tokengenerate(email,id) 

               return res.status(200).cookie("token",token).json({ msg: 'Login successful',ts:"success",email,id,token});
             } catch (error) {
             
              
               return res.status(500).json({msg: "Server error", ts: "error" });
             }
};

// get profile =====
export const userProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const userData = await user.findById(id).select('name email');
    const orderHistory = await order.find({ userId: id });
    
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const turfIds = orderHistory.map(order => order.turfId);

    const turfs = await turf.find({ _id: { $in: turfIds } });


    const userProfile = {
      user: userData,
      orderHistory,
      turfs
    };

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const usercheck = (req, res, next) => {
  try {
      const { token } = req.cookies;


      if (!token) return res.status(400).json({ success: false, isAuthenticated: false, msg: "User not authenticated", ts: "error" });

      const tokenVerified = jwt.verify(token, process.env.jWTKEY);

      if (!tokenVerified) return res.status(400).json({ success: false, isAuthenticated: false, msg: "User not authenticated", ts: "error" });

      return res.status(200).json({ success: true, isAuthenticated: true, msg: "User authenticated", ts: "success" });

  } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, isAuthenticated: false, msg: "Internal server error", ts: "error" });
  }
};