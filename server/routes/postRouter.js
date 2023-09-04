const router = require('express').Router;
const { Video, Channel, sequelize, Subscription } = require('../db/models');

const postRouter = router();

postRouter.get('/subs/channels/:offset', async (req, res) => {
  const { offset } = req.params;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const channels = await Subscription.findAndCountAll({
    where: { userId },
    include: {
      model: Channel,
    },
    offset,
    limit: 3,
  });

  return res.json({ ...channels, rows: channels.rows.map((el) => el.Channel) });
});

postRouter.get('/subs', async (req, res) => {
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const videos = await Subscription.findAll({
    where: { userId },
    include: {
      model: Channel,
      include: {
        model: Video,
        include: Channel,
        limit: 8,
      },
    },
  });

  // console.log(videos)

  // const videos = rows.map((el) => el.Channel.Videos).flat();

  // console.log(videos.map((el) => el.Channel.Videos).flat());

  return res.json(videos.map((el) => el.Channel.Videos).flat());
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
