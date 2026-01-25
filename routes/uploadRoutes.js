const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController');

const router = express.Router();
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fs = require('fs');
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (allowed.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpg, png, gif, webp) are allowed'));
    }
  },
});

router.get('/', uploadController.getImages);
router.post('/upload', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    next();
  });
}, uploadController.uploadImage);

module.exports = router;
