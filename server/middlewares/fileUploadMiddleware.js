import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const userId = req.user.id; 
        const currentTime = Date.now(); 
        const fileExtension = file.originalname.split('.').pop(); 
        const newFileName = `${currentTime}_${userId}.${fileExtension}`;

        cb(null, newFileName);
    },
});

export const upload = multer({ storage: storage });
