const router = require('express').Router;
const videoRouter = require('../test/videoRouter');
const authRouter = require('./authRouter');
const postRouter = require('./postRouter');

const indexRouter = router();

indexRouter.get('/', (req, res) => {
  res.json({ message: 'You have access to request data' });
});

indexRouter.use('/auth', authRouter);
indexRouter.use('/videos', postRouter);
indexRouter.use('/video', videoRouter);

module.exports = indexRouter;
