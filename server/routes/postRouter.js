const router = require('express').Router;
const { Video, Channel, sequelize, Subscription, Comment } = require('../db/models');

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

postRouter.post('/:link', async (req, res) => {
  if (!req.session.user) {
    res
      .status(401)
      .json({ message: 'You are not authorized to create a new comment' });
    return;
  }
  const { commentFrom } = req.body;
  const {link} = req.params
  const videoId = await Video.findOne({where: {link }})
  const comment = await Comment.create({
    userId: req.session.user.id,
    videoId,
    message: commentFrom,
  });
  console.log(comment);
  res.json(comment);
});

module.exports = postRouter;
