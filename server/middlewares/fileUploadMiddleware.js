import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    try {
      const userId = req.user.id;
      const currentTime = Date.now();
      const fileExtension = file.originalname.split('.').pop();
      const newFileName = `${currentTime}_${userId}.${fileExtension}`;
      
      cb(null, newFileName);
    } catch (error) {
      cb(error);
    }
  },
});

export const upload = (req, res, next) => {
  try {
    const uploadMiddleware = multer({ storage }).single('file');
    
    uploadMiddleware(req, res, (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message ,ts: "error" });
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ msg: err.message ,ts: "error" });
  }
};
