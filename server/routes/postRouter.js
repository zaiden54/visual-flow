const router = require('express').Router;
const { Video, Channel, sequelize, Subscription } = require('../db/models');

const postRouter = router();

postRouter.get('/subs/channels/:offset', async (req, res) => {
  const { offset } = req.params;
  const userId = req.session.user?.id;

  console.log(userId)

  if (!userId) {
    return res.status(401).json({ message: 'Unathorized' });
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
  // res.sendStatus(200)
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
