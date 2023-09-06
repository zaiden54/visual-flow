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

channelRouter.delete('/delete/:videoId', async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findByPk(videoId);
  // if (video.userId !== req.session.user.id) {
  //   res.status(401).json({ message: 'not authorized' });
  // } else {
  await video.destroy();
  const channelId = req.session.user.id;

  const allVideos = await Video.findAll({ where: { channelId } });
  res.json(allVideos);
});

module.exports = channelRouter;
