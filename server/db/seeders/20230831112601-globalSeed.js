/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
const uuid = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const date = new Date();

    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          role: 'Administrator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: 'Moderator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: 'User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Denis',
          email: 'my@zaiden.ru',
          password: await bcrypt.hash('123', 5),
          isActivated: false,
          link: uuid.v4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German',
          email: 'my@german1.ru',
          password: await bcrypt.hash('123', 5),
          isActivated: false,
          link: uuid.v4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German1',
          email: 'my@german2.ru',
          password: await bcrypt.hash('123', 5),
          isActivated: false,
          link: uuid.v4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German2',
          email: 'my@german3.ru',
          password: await bcrypt.hash('123', 5),
          isActivated: false,
          link: uuid.v4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German3',
          email: 'my@german4.ru',
          password: await bcrypt.hash('123', 5),
          isActivated: false,
          link: uuid.v4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German4',
          email: 'my@german5.ru',
          password: await bcrypt.hash('123', 5),
          isActivated: false,
          link: uuid.v4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German5',
          email: 'my@german6.ru',
          password: await bcrypt.hash('123', 5),
          isActivated: false,
          link: uuid.v4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Channels',
      [
        {
          name: 'Denis',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German1',
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German2',
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German3',
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German4',
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'German5',
          userId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Videos',
      [
        {
          title: '24h of Mr.Beast',
          description: 'Feastables',
          views: 0,
          link: uuid.v4(),
          channelId: 1,
          preview: '/previews/kitten-1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: '24h of Mr.Beast',
          description: 'Feastables',
          views: 0,
          link: uuid.v4(),
          channelId: 1,
          preview: '/previews/kitten-1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: '24h of Mr.Beast',
          description: 'Feastables',
          views: 0,
          link: uuid.v4(),
          channelId: 1,
          preview: '/previews/kitten-1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: '24h of Mr.Beast',
          description: 'Feastables',
          views: 0,
          link: uuid.v4(),
          channelId: 1,
          preview: '/previews/kitten-1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: '24h of Mr.Beast',
          description: 'Feastables',
          views: 0,
          link: uuid.v4(),
          channelId: 1,
          preview: '/previews/kitten-1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: '24h of Mr.Beast',
          description: 'Feastables',
          views: 0,
          link: uuid.v4(),
          channelId: 1,
          preview: '/previews/kitten-1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: '24h of Mr.Beast',
          description: 'Feastables',
          views: 0,
          link: uuid.v4(),
          channelId: 3,
          preview: '/previews/kitten-1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Subscriptions',
      [
        {
          userId: 1,
          channelId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          channelId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          channelId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          channelId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          channelId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          channelId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          channelId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          channelId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: 1,
          videoId: 1,
          message: 'Хрень',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Likes',
      [
        {
          userId: 2,
          videoId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
