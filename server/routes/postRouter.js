const router = require('express').Router;
const { Video, Channel, User, sequelize } = require('../db/models');

const postRouter = router();

postRouter.get('/subs', async (req, res) => {
  const userId = req.session.user.id;

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

  res.json(videos.subscriptions);
});

postRouter.get('/random', async (req, res) => {
  const randomVids = await Video.findAll({
    order: sequelize.random(),
    limit: 8,
  });
  res.json(randomVids);
});

module.exports = postRouter;
