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
    console.log(req.body.event)
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
  // fileFilter,
  limites: {
    fileSize: 1024 * 1024 * 1024 * 8,
  },
});

uploadRouter.post('/video', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'preview', maxCount: 1 }]), async (req, res) => {
  console.log(req.files);
  const { title, description } = req.body;
  const { id } = req.session.user;

  const user = await User.findOne({
    where: { id },
    include: Channel,
  });

  console.log(req.files);

  const video = await Video.create({
    title,
    description,
    link: uuid.v4(),
    fileName: req.files.video[0].filename,
    channelId: user.Channel.id,
    preview: req.files.preview[0].filename
  });

  res.sendStatus(200);
});

module.exports = uploadRouter;
