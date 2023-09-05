const router = require('express').Router;
const fs = require('fs');
const path = require('path');
const { Video, Channel, Subscription, Like, Comment, User } = require('../db/models');

const watchRouter = router();

watchRouter.get('/:link', async (req, res) => {
  try {
    const { range } = req.headers;
    const { link } = req.params;

    if (!range || !link) {
      res.status(400).send('Requires Range Header or Link is Invalid');
    }

    const video = await Video.findOne({ where: { link } });

    const fullPath = path.join(__dirname, '..', 'uploads', video.fileName);

    const videoSize = fs.statSync(fullPath).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(fullPath, { start, end });

    videoStream.pipe(res);
  } catch (error) {
    return res.json({ error });
  }
});

watchRouter.get('/info/:link', async (req, res) => {
  const { link } = req.params;

  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const info = await Video.findOne({
    where: { link },
    include: [
      {
        model: Channel,
        include: {
          model: Subscription,
        },
      },
      {
        model: Like,
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['name'],
        },
      },
    ],
  });

  return res.json(info);
});

module.exports = watchRouter;
