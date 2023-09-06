const router = require('express').Router;
const fs = require('fs');
const path = require('path');
const { Video, Channel, Subscription, Like, Comment, User, Report } = require('../db/models');

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

watchRouter.put('/:link', async (req, res) => {
  try {
    const video = await Video.findOne({ where: { link: req.params.link } });
    await video.increment('views', { by: 1 });
    await video.save();
    return res.sendStatus(200);
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

watchRouter.post('/info/:link', async (req, res) => {
  console.log(req.body);
  const userId = req.session.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { link } = req.params;
  const videoId = await Video.findOne({ where: { link } });
  const { message } = req.body;
  console.log(message);
  await Comment.create({
    userId,
    videoId: videoId.id,
    message,
    include: {
      model: User,
    },
  });
  const data = await Comment.findAll({ where: { videoId: videoId.id }, include: { model: User } });
  res.json(data);
});

watchRouter.post('/report', async (req, res) => {
  try {
    const { videoId } = req.body;
    const [rep, newRep] = await Report.findOrCreate({
      where: { videoId },
      defaults: { videoId },
    });
    if (!newRep) {
      newRep.reportCount += 1;
      await newRep.save();
      return res.json(newRep);
    }
    rep.reportCount += 1;
    await rep.save();
    return res.json(rep);
  } catch {
    return res.status(404).json({ message: 'Video not found' });
  }
});

module.exports = watchRouter;
