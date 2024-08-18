import { body, validationResult } from 'express-validator';
import { turf } from '../../db/models/turfModel.js';


// Add turf

export const addTurfValidators = [
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('rent').isNumeric().withMessage('Rent must be a number').notEmpty(),
  body('size').notEmpty().withMessage('Size is required').trim().escape(),
  body('description').notEmpty().withMessage('Description is required').trim().escape(),
  body('address').notEmpty().withMessage('Address is required').trim().escape(),
  body('pincode').notEmpty().withMessage('Pincode is required').trim().escape(),
  body('slots').isArray().withMessage('Slots must be an array').optional(),
];

export const addturf = async (req, res) => {
  await Promise.all(addTurfValidators.map(validator => validator.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, name, rent, size, description, address, pincode, slots} = req.body;

  try {
    const newturf = await turf.create({
      userId,
      imgLink,
      name,
      rent,
      size,
      description,
      address,
      pincode,
      slots,
      assignedTo:userId,
    });

    res.status(201).json({ msg: 'Turf added successfully', ts: 'success', turf: newturf });
  } catch (error) {
    res.status(500).json({ msg: 'Server error, try again', ts: 'error', error });
  }
};
