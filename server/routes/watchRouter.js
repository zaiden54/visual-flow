const router = require('express').Router;
const fs = require('fs');
const { Video } = require('../db/models');

const watchRouter = router();

watchRouter.get('/:link', async (req, res) => {
  const { range } = req.headers;
  const { link } = req.params;

  if (!range || !link) {
    res.status(400).send('Requires Range Header or Link is Invalid');
  }

  const video = await Video.findOne({ where: { link } });
  const fullPath = (`${__dirname}/${video.fileName}`).replace('routes', 'uploads');
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
});

module.exports = watchRouter;
