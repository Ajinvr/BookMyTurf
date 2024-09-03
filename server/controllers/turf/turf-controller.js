import { body, validationResult } from 'express-validator';
import { turf } from '../../db/models/turfModel.js';
import { imageUploadCloudinary } from '../../utils/cloudinary.js';
import cloudinary from 'cloudinary';
import { turfSlot } from '../../db/models/turfTimeSlotsModel.js';

// get all 
export const getAllturf = async (req,res) => {
   try {
      const turfs = await turf.find();
      res.json({ turfs});
   } catch (error) {
     res.status(500).json({ msg: "Server Error", ts: "error" });
   }
}





export const getTurf = async (req,res) => {
  let { id } = req.params
  try {
     const turfs = await turf.findOne({_id:id});
     res.json({ turfs});
  } catch (error) {
    res.status(500).json({ msg: "Server Error", ts: "error" });
  }
}


const TurfValidators = [
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('rent').isNumeric().withMessage('Rent must be a number').notEmpty(),
  body('size').notEmpty().withMessage('Size is required').trim().escape(),
  body('description').notEmpty().withMessage('Description is required').trim().escape(),
  body('address').notEmpty().withMessage('Address is required').trim().escape(),
  body('pincode').notEmpty().withMessage('Pincode is required').trim().escape(),
  body('slots').isArray().withMessage('Slots must be an array').optional(),
];

// add turf =====
export const addTurf = async (req, res) => {
 
  await Promise.all(TurfValidators.map(validator => validator.run(req)));
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

// editturf ======
export const editTurf = async (req, res) => {
 
  const { id } = req.params;
 
  await Promise.all(TurfValidators.map(validator => validator.run(req)));
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, rent, size, description, address, pincode, slots } = req.body;
  const userId = req.user.id;

  try {
    const Turf = await turf.findById(id);
    if (!Turf) {
      return res.status(404).json({ msg: 'Turf not found', ts: 'error' });
    }

    const updates = {
      name,
      rent,
      size,
      description,
      address,
      pincode,
      slots,
      assignedTo: userId,
    };

    if (req.file) {
      if (Turf.imgLink) {
        const publicId = Turf.imgLink.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const imgLink = await imageUploadCloudinary(req.file.path);
      updates.imgLink = imgLink;
    }

   await turf.findByIdAndUpdate(id, updates, { new: true });

    return res.status(200).json({ msg: 'Turf updated successfully', ts: 'success'});
  } catch (error) { 
    return res.status(500).json({ msg: 'Server error, try again', ts: 'error' });
  }
};

// delete turf ==
export const deleteTurf = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  
  try {
    const foundturf = await turf.findById(id)

    if (!foundturf) return res.status(404).json({ msg: "Turf not found", ts: "error" });

    const imgLink = foundturf.imgLink;

    if (imgLink) {
      const publicId = imgLink.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await turf.findByIdAndDelete(id);

    res.status(200).json({ msg: "Turf deleted successfully", ts: "success" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting turf", ts: "error" });
  }
};

export const getTurfSlots = async (req, res) => {
  try {
    const { turfId } = req.params;
    const { date } = req.query;

    if (!turfId || !date) {
      return res.status(400).json({ message: 'Turf ID and date are required' });
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const turf = await turfSlot.findOne({
      turfId,
      date: parsedDate
    });
    

    if (!turf) {
      return res.status(204).json({ message: 'No slots found for the given turf ID and date' });
    }

    const slots = turf.slots;

    res.status(200).json(slots);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
