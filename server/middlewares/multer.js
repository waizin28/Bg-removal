import multer from 'multer';

// Create multer middleware for parsing formdata
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
