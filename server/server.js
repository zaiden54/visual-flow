const express = require('express');
const cors = require('cors');
const sessionParser = require('./middlewares/sessionParser');
const indexRouter = require('./routes/indexRouter');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(sessionParser);

app.use('/api', indexRouter);

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
