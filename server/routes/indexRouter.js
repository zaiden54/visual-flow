const router = require('express').Router;
const authRouter = require('./authRouter');
const videoRouter = require('./videoRouter');

const indexRouter = router();

indexRouter.get('/', (req, res) => {
  res.json({ message: 'You have access to request data' });
});

indexRouter.use('/auth', authRouter);
indexRouter.use('/video', videoRouter);

module.exports = indexRouter;
