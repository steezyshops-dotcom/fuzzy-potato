// backend/routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const File = require('../models/File');
const auth = require('../middleware/auth');

const router = express.Router();

// Ensure uploads dir exists (safe if already exists)
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage: save files into /uploads with unique names
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  },
});
const upload = multer({ storage });

// POST /api/files/upload (Private)
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    // Normalize "uploads/<filename>" (forward slashes for URLs)
    const storedName = req.file.filename;
    const publicPath = path.posix.join('uploads', storedName);

    const newFile = new File({
      filename: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: publicPath,
      uploadedBy: req.user.id,
    });

    await newFile.save();
    res.json(newFile);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).send('Server error');
  }
});

// GET /api/files/myfiles (Private) - list files for current user
router.get('/myfiles', auth, async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.id })
      .sort({ uploadDate: -1 });
    res.json(files);
  } catch (err) {
    console.error('List files error:', err);
    res.status(500).send('Server error');
  }
});

// DELETE /api/files/:id (Private) - delete if owner
router.delete('/:id', auth, async (req, res) => {
  try {
    const fileDoc = await File.findById(req.params.id);
    if (!fileDoc) return res.status(404).json({ msg: 'File not found' });

    if (fileDoc.uploadedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Remove from disk
    const absolutePath = path.join(process.cwd(), fileDoc.filePath);
    fs.unlink(absolutePath, (err) => {
      if (err) console.error('Error deleting file from disk:', err);
    });

    // Remove from DB
    await fileDoc.deleteOne();
    res.json({ msg: 'File deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

