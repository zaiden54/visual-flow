const router = require('express').Router;
const { Video, Channel, User, Subscription } = require('../db/models');

const subRouter = router();

subRouter.post('/', async (req, res) => {
  const { userId, channelId } = req.body;
  //   console.log(req.body);
  const [newSub, subbed] = await Subscription.findOrCreate({
    where: { userId, channelId },
    defaults: { userId, channelId },
  });

  if (!subbed) {
    await newSub.destroy();
    return res.sendStatus(200)
  }
    console.log(newSub);
  return res.json(newSub);
});

module.exports = subRouter;
