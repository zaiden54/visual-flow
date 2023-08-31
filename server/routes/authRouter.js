const router = require('express').Router;

const authRouter = router();

authRouter.get('/', (req, res) => {
  res.json({ message: 'auth router' });
});

module.exports = authRouter;
