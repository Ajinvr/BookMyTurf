import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { manager } from '../../db/models/managerModel.js';


const salt = 10;

const tokengenerate = (name, email, id, role) => {
  const token = jwt.sign({ name, email, id , role}, process.env.jWTKEY);
  return token;
};

// signup ====
export const signupValidators = [
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim(),
];

export const managerSignup = async (req, res) => {
  await Promise.all(signupValidators.map(validator => validator.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    let isExistingUser = await manager.findOne({ email });
    if (isExistingUser != null) return res.status(409).json({ msg: "Manager already exists", ts: "error" });

    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser = await manager.create({ name, email, password: hashedPassword });
    let id = newUser._id;
    let role = newUser.role
    let token = tokengenerate(name, email, id,role);

    res.status(201).cookie("token", token).json({ msg: 'Sign up successful', ts: "success", name, email, id });
  } catch (error) {
    res.status(500).json({ msg: 'Server error try again', ts: "error" });
  }
};

// login ====
export const loginValidators = [
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').trim(),
];

export const managerLogin = async (req, res) => {
  await Promise.all(loginValidators.map(validator => validator.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    let existingUser = await manager.findOne({ email });
    if (existingUser == null) return res.status(401).json({ msg: "Manager doesn't exist", ts: "error" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials", ts: "error" });

    let name = existingUser.name;
    let id = existingUser._id;
    let role = existingUser.role
    let token = tokengenerate(name, email, id, role);

    return res.status(200).cookie("token", token).json({ msg: 'Login successful', ts: "success", name, email, id });
  } catch (error) {
    return res.status(500).json({ msg: "Server error try again", ts: "error" });
  }
};

