const router = require('express').Router;
const multer = require('multer');
const path = require('path');

const uploadRouter = router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  console.log(file.mimetype);
  if (file.mimetype !== 'video/mp4' && file.mimetype !== 'video/x-m4v' && file.mimetype !== 'video/webm' && file.mimetype !== 'video/mpeg') {
    cb(null, false);
  } else cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limites: {
    fileSize: 1024 * 1024 * 1024 * 8,
  },
});

uploadRouter.post('/video', upload.single('video'), (req, res) => {
  console.log(req.file);
  res.sendStatus(200);
});

module.exports = uploadRouter;
