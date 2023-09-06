const router = require('express').Router;
const { Video, Channel, sequelize, Subscription, Comment, Like, Report } = require('../db/models');
const { Op } = require('sequelize');

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
  const { link } = req.params;
  const comments = await Video.findOne({
    where: { link },
    include: [
      {
        model: Comment,
      },
      { model: Channel },
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

postRouter.post('/search/:offset', async (req, res) => {
  const { offset } = req.params;
  const { searchString } = req.body;
  console.log('offset', offset);
  console.log('searchString', searchString);
  const { rows, count } = await Video.findAndCountAll({
    include: Channel,
    where: {
      title: {
        [Op.substring]: searchString,
      },
    },
    offset,
    limit: 5,
  });
  return res.json({ rows, count });
});

postRouter.post('/search/:offset', async (req, res) => {
  const { offset } = req.params;
  const { searchString } = req.body;
  console.log('offset', offset);
  console.log('searchString', searchString);
  const { rows, count } = await Video.findAndCountAll({
    include: Channel,
    where: {
      title: {
        [Op.substring]: searchString,
      },
    },
    offset,
    limit: 5,
  });
  return res.json({ rows, count });
});

postRouter.post('/rep', async (req, res) => {
  console.log(req.body);
  try {
    const { videoId } = req.body;
    const [rep, newRep] = await Report.findOrCreate({
      where: { videoId },
      defaults: { videoId },
    });
    console.log(newRep, rep);
    if (!newRep) {
      rep.reportCount += 1;
      await rep.save();

      return res.json(rep);
    }
    // rep.reportCount += 1;
    // await rep.save();
    return res.json(rep);
  } catch (err) {
    return res.status(404).json(err);
  }
});

postRouter.get('/rep/all', async (req, res) => {
  const allReps = await Report.findAll({
    include: {
      model: Video,
      include: Channel,
      // include: Report,
    },
  });
  console.log('BAAACKKKKK', allReps);
  res.json(allReps);
});
module.exports = postRouter;
