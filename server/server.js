const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
// const { createClient } = require('redis');

const sessionParser = require('./middlewares/sessionParser');
const indexRouter = require('./routes/indexRouter');
const postRouter = require('./routes/postRouter');
const watchRouter = require('./routes/watchRouter');
const channelRouter = require('./routes/channelRouter');
const authRouter = require('./routes/authRouter');

const PORT = process.env.PORT || 3001;

// const redisClient = createClient({
//   url: 'redis://localhost:6379',
//   legacyMode: true,
// });
// redisClient.connect().catch(console.error);

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.enable('trust proxy');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(sessionParser);

// app.use(
//   session({
//     name: 'sId',
//     store: new RedisStore({ client: redisClient }),
//     secret: '1231241',
//     resave: false,
//     saveUninitialized: false,
//     maxAge: 365 * 24 * 60 * 60 * 1000,
//   }),
// );

app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.user = req.session.user;
  next();
});

// app.use((req, res, next) => {
//   console.log(req.get('origin'));
//   next();
// });

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/videos', postRouter);
app.use('/api/watch', watchRouter);
app.use('/api/channel', channelRouter);

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
