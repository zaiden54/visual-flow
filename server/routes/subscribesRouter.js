const router = require('express').Router;
const { Subscription, Channel } = require('../db/models');

const subRouter = router();

subRouter.post('/', async (req, res) => {
  const { userId, channelId } = req.body;
  //   console.log(req.body);
  if (userId === channelId) {
    return res.status(400).json({ message: 'нет.' });
  }
  const [newSub, subbed] = await Subscription.findOrCreate({
    where: { userId, channelId },
    defaults: { userId, channelId },
    include: Channel,
  });

  const sub = await Subscription.findOne({
    where: { id: newSub.id },
    include: Channel,
  });

  if (!subbed) {
    await newSub.destroy();
    console.log(JSON.stringify(newSub, null, 1));
    return res.json(newSub);
  }

  console.log(JSON.stringify(sub, null, 1));


  return res.json(sub);
});

module.exports = subRouter;
