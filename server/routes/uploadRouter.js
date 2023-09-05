const router = require('express').Router;
const multer = require('multer');
const path = require('path');
const { Video, User, Channel } = require('../db/models');
const uuid = require('uuid');
const ffmpeg = require('fluent-ffmpeg');

const uploadRouter = router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file.fieldname);
    switch (file.fieldname) {
      case 'video':
        cb(null, 'uploads');
        break;
      case 'preview':
        cb(null, 'public/previews');
        break;
      default:
        break;
    }
    // cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype !== 'video/mp4' &&
    file.mimetype !== 'video/x-m4v' &&
    file.mimetype !== 'video/webm' &&
    file.mimetype !== 'video/mpeg' &&
    file.mimetype !== 'image/png'
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

uploadRouter.post(
  '/video',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'preview', maxCount: 1 },
  ]),
  async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.session.user;

    const user = await User.findOne({
      where: { id },
      include: Channel,
    });

    if (!req.files.video) {
      return res.json({ message: 'Пожалуйста, приложите видеофайл!' });
    }

    // if (!req.files.preview) {
    //   ffmpeg(path.join(__dirname, '..', 'uploads', `${req.files.video[0].filename}`))
    //     .on('end', () => {
    //       console.log('Screenshot taken!');
    //     })
    //     .screenshots({
    //       folder: path.join(__dirname, '..', 'public', 'previews'),
    //       count: 1,
    //       filename: `thumbnail-${req.files.video[0].filename.split('.')[0]}.png`,
    //     });
    // }

    const video = await Video.create({
      title,
      description,
      link: uuid.v4(),
      fileName: req.files.video[0].filename,
      channelId: user.Channel.id,
      preview: req.files.preview
        ? `/previews/${req.files.preview[0].filename}`
        : `/previews/thumbnail-${req.files.video[0].filename.split('.')[0]}.png`,
    });

    const allVideos = await Video.findAll({
      where: { channelId: user.Channel.id },
      include: { model: Channel },
    });

    // res.sendStatus(200);
    res.json(allVideos);
  },
);

module.exports = uploadRouter;
