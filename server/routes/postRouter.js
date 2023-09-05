const router = require('express').Router;
const { Video, Channel, sequelize, Subscription, Comment, Like } = require('../db/models');

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
        order: [['createdAt', 'DESC']],
      },
    },
  });

  return res.json(videos.map((el) => el.Channel.Videos).flat());
});

postRouter.get('/subs/all', async (req, res) => {
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const videos = await Subscription.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
    include: {
      model: Channel,
      include: {
        model: Video,
        include: Channel,
      },
    },
  });
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

postRouter.get('/:link', async (req, res) => {
  const {link} = req.params;
 const comments = await Video.findOne({
    where: { link },
    include: [
      {
        model: Comment,
      },
      { model: Channel }
    ],
  });
  console.log(comments);
  res.json(comments);
});

postRouter.put('/like', async (req, res) => {
  const { videoId, userId } = req.body;
  const liked = await Like.findOne({
    where: {
      videoId,
      userId,
    },
  });

  if (!liked) {
    const newLike = await Like.create({
      videoId,
      userId,
    });
    return res.json(newLike);
  }
  await Like.destroy({
    where: {
      videoId,
      userId,
    },
  });
  return res.json(liked);
});

module.exports = postRouter;
