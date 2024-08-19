import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { user } from "../../db/models/userModel.js"
import { order } from '../../db/models/orderModel.js';
import { turf } from '../../db/models/turfModel.js'
const salt = 10;


const tokengenerate = (name, email,id) => {
  const token = jwt.sign({ name, email, id }, process.env.jWTKEY);
  return token;
};



// signup ====

export const signupValidators = [
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim(),
];

export const signup = async (req, res) => {
  await Promise.all(signupValidators.map(validator => validator.run(req)));
       const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
                const { name, email, password } = req.body;
                      try { 
                             let isExistinguser  = await user.findOne({ email })                               
                               
                              if (isExistinguser != null) return res.status(409).json({msg:"user already exists", ts:"error"})
                                
                              const hashedPassword = await bcrypt.hash(password,salt);

                              let newuser = await user.create({name,email,password:hashedPassword})
                              let id = newuser._id
                              
                              let token = tokengenerate(name,email,id)

                         res.status(201).cookie("token",token).json({ msg: 'Sign up successful' ,ts:"success",name,email,id});
                       } catch (error) {
                         res.status(500).json({ msg : 'Server error try again' ,ts:"error" });
                       }
};


// login ====

export const loginValidators = [
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
                               
                                   let name = Existinguser.name
                                   let id = Existinguser._id 
                                   let token = tokengenerate(name,email,id) 

               return res.status(200).cookie("token",token).json({ msg: 'Login successful',ts:"success",name,email,id});
             } catch (error) {
               return res.status(500).json({msg: "Server error", ts: "error" });
             }
};


export const userprofile = async (req, res) => {
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
