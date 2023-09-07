const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const sessionParser = require('./middlewares/sessionParser');

const indexRouter = require('./routes/indexRouter');
const postRouter = require('./routes/postRouter');
const watchRouter = require('./routes/watchRouter');
const channelRouter = require('./routes/channelRouter');
const subRouter = require('./routes/subscribesRouter');
const authRouter = require('./routes/authRouter');
const roomsRouter = require('./routes/roomsRouter');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(sessionParser);

app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.user = req.session.user;
  next();
});

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/videos', postRouter);
app.use('/api/watch', watchRouter);
app.use('/api/channel', channelRouter);
app.use('/api/subscription', subRouter);
app.use('/api/room', roomsRouter);
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
