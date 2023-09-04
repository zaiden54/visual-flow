const router = require('express').Router;
const multer = require('multer');
const path = require('path');
const { Video, User, Channel } = require('../db/models');
const uuid = require('uuid');

const uploadRouter = router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  // console.log(file.mimetype);
  if (
    file.mimetype !== 'video/mp4' &&
    file.mimetype !== 'video/x-m4v' &&
    file.mimetype !== 'video/webm' &&
    file.mimetype !== 'video/mpeg'
  ) {
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

uploadRouter.post('/video', upload.single('video'), async (req, res) => {
  // console.log(req.file);
  const { title, description } = req.body;
  const { id } = req.session.user;

  const user = await User.findOne({
    where: { id },
    include: Channel,
  });

  // console.log(req.file.filename);

  const video = await Video.create({
    title,
    description,
    link: uuid.v4(),
    fileName: req.file.filename,
    channelId: user.Channel.id,
  });

  res.sendStatus(200);
});

module.exports = uploadRouter;
