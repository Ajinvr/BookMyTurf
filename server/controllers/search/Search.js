import Fuse from 'fuse.js';
import { turf } from '../../db/models/turfModel.js';

const fuseOptions = {
  includeScore: true,
  keys: ['name', 'rent', 'pincode', 'size']
};

export const searchTurf = async (req, res) => {
  try {
    const query = req.query.q || '';
    
    if (query.trim() === '') {
      const documents = await turf.find().exec();
      return res.json(documents);
    }

    const documents = await turf.find().exec();
    const fuse = new Fuse(documents, fuseOptions);
    const results = fuse.search(query).map(result => result.item);
    res.json(results);
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred', error });
  }
};
