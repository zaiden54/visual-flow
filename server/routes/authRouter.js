const router = require('express').Router;
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { User } = require('../db/models');
const sendActivationMail = require('../service/mailService');

const authRouter = router();

authRouter.get('/check', (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'no cookies' });
  }
  setTimeout(() => {
    res.json(req.session.user);
  }, 2000);
});

authRouter.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: 'Заполните все поля' });
  }

  const hash = await bcrypt.hash(password, 10);
  const activationLink = uuid.v4();

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name: username,
      email,
      password: hash,
      link: activationLink,
    },
  });

  await sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

  if (!created) {
    res.status(400).json({ message: 'Такой пользователь уже существует' });
  }

  // const userInfo = {
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   isActivated: user.isActivated,
  // };

  req.session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    isActivated: user.isActivated,
  };

  return res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    isActivated: user.isActivated,
  });
});

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Заполните все поля' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user?.password))) {
    res.status(400).json({ message: 'Неверная электронная почта или пароль' });
  }

  // const userInfo = {
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   isActivated: user.isActivated,
  // };

  req.session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    isActivated: user.isActivated,
  };

  return res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    isActivated: user.isActivated,
  });
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.sendStatus(200);
});

authRouter.get('/activate/:activationLink', async (req, res) => {
  const { activationLink } = req.params;

  const user = await User.findOne({ where: { link: activationLink } });

  if (!user) {
    res.json({ message: 'Такого пользователя не существует или ссылка ошибочная' });
  }

  user.isActivated = true;
  await user.save();

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    isActivated: user.isActivated,
  };

  res.redirect('http://localhost:3000/');
});

module.exports = authRouter;
