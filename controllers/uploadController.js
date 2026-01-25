const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

// List image filenames by reading the uploads folder
exports.getImages = (req, res) => {
  try {
    ensureUploadsDir();
    const names = fs.readdirSync(UPLOADS_DIR);
    const images = names.filter((name) => {
      const ext = path.extname(name).toLowerCase();
      return ALLOWED_EXT.has(ext);
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// After multer uploads, we just return success (file is already on disk)
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(201).json({ filename: req.file.filename });
};
