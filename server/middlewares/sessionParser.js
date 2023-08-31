const store = require('session-file-store');
const session = require('express-session');

const FileStore = store(session);

const sessionParser = session({
  name: 'user_sid',
  store: new FileStore({}),
  secret: 'zaiden',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});

module.exports = sessionParser;
