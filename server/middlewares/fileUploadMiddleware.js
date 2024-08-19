import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename:(req, file, cb) => {
    const currentDate =  Date.now() + req.user.id;
    const fileExtension = path.extname(file.originalname);
    cb(null, `${currentDate}${fileExtension}`);
    
  },
});

export const upload = multer({ storage });
