import { body, validationResult } from 'express-validator';
import { turf } from '../../db/models/turfModel.js';
import { imageUploadCloudinary } from '../../utils/cloudinary.js';

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

  const { name, rent, size, description, address, pincode, slots } = req.body;
  const userId = req.user.id;

  try {
    const imgLink = await imageUploadCloudinary(req.file.path);
    turf.create({
      userId,
      imgLink,
      name,
      rent,
      size,
      description,
      address,
      pincode,
      slots,
      assignedTo: userId,
    });

    return res.status(201).json({ msg: 'Turf added successfully', ts: 'success'});
  } catch (error) {
    return res.status(500).json({ msg: 'Server error, try again', ts: 'error',  });
  }
};
