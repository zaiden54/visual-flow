const router = require('express').Router;
const { Video, Channel, User, Subscription } = require('../db/models');

const channelRouter = router();

channelRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const channel = await Channel.findOne({
    where: { userId: id },
    include: [
      {
        model: Video,
        order: [['createdAt', 'DESC']],
        include: {
          model: Channel,
        },
      },
      {
        model: User,
      },
      {
        model: Subscription,
      },
    ],
  });

  return res.json(channel);
});

module.exports = channelRouter;
