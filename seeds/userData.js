const { User } = require('../models');

const userData = [
  {
    username: 'Freddie',
    email: 'freddie@gmail.com',
    password: '12344567',
  },
  {
    username: 'Arthur',
    email:'arthur@gmail.com',
    password: '12344567',
  },
  {
    username: 'Tommie',
    email: 'tommie@gmail.com',
    password: '12344567',
  },
];

const seedUser = () => User.bulkCreate(userData,{
  individualHooks: true,
  returning: true});

module.exports = seedUser;
