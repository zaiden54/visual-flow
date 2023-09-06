const router = require('express').Router;
const uuid = require('uuid');
const { Room } = require('../db/models');

const roomsRouter = router();

roomsRouter.post('/new', async (req, res) => {
  const { video } = req.body;

  const room = await Room.create({
    title: video.title,
    roomLink: uuid.v4(),
    userId: req.session.user.id,
    videoId: video.id,
  });

  // const result = await Room.findOne({
  //   where: { id: room.id },
  //   include: Channel,
  // });

  return res.json(room);
});

module.exports = roomsRouter;
