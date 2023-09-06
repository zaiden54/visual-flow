const router = require('express').Router;
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { User, Channel } = require('../db/models');
const sendActivationMail = require('../service/mailService');

const authRouter = router();

authRouter.get('/check', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'no cookies' });
  }
  console.log('?????????????????????????', req.session.user);
  return res.json(req.session.user);
});

authRouter.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
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
      roleId: null,
    },
  });

  const [channel, createdChannel] = await Channel.findOrCreate({
    where: { userId: user.id },
    defaults: {
      name: user.name,
    },
  });

  if (!created || !createdChannel) {
    return res.status(400).json({ message: 'Такой пользователь уже существует' });
  }

  await sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

  req.session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    isActivated: user.isActivated,
    roleId: user.roleId,
  };

  return res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    isActivated: user.isActivated,
    roleId: user.roleId,
  });
});

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  const user = await User.findOne({ where: { email } });
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!', user);
  if (!user || !(await bcrypt.compare(password, user?.password))) {
    return res.status(400).json({ message: 'Неверная электронная почта или пароль' });
  }

  req.session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    isActivated: user.isActivated,
    roleId: user.roleId,
  };

  return res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    isActivated: user.isActivated,
    roleId: user.roleId,
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
    roleId: user.roleId,
  };

  res.redirect('http://localhost:3000/');
});

module.exports = authRouter;
