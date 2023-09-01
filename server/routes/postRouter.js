const router = require('express').Router;

const {
  Video, Channel, User, sequelize,
} = require('../db/models');

const postRouter = router();

postRouter.get('/subs', async (req, res) => {
  const userId = req.session.user?.id;

  // console.log(userId);

  if (!userId) {
    return res.status(401).json({ message: 'Unathorized' });
  }

  const videos = await User.findOne({
    where: { id: userId },
    include: {
      model: Channel,
      as: 'subscriptions',
      include: {
        model: Video,
      },
    },
  });

  return res.json(videos.subscriptions);
});

postRouter.get('/random', async (req, res) => {
  const randomVids = await Video.findAll({
    order: sequelize.random(),
    limit: 8,
    include: {
      model: Channel,
    },
  });
  res.json(randomVids);
});

module.exports = postRouter;
