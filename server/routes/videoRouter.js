const router = require('express').Router;
const fs = require('fs');

const videoRouter = router();

videoRouter.get('/', (req, res) => {
  // res.sendFile(__dirname + '../public/video/index.html');
  res.sendFile(`${__dirname}/index.html`);
});

videoRouter.get('/watch', async (req, res) => {
  const { range } = req.headers;

  if (!range) {
    res.status(400).send('Requires Range Header');
  }

  const fileName = 'shit.mp4';
  const fullPath = `${__dirname}/${fileName}`;

  const videoSize = fs.statSync(fullPath).size;
  // console.log(videoSize);

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

module.exports = videoRouter;
