const { User, Channel, Video } = require('../db/models');

// User.findAll({
//   include: 'subscriptions',
// }).then((data) => console.log(JSON.stringify(data[0], null, 1)));

Video.findAll().then((data) => console.log(JSON.stringify(data, null, 1)));
