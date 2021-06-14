require('dotenv').config();
const seedUser = require('./userData');
const seedAppointment = require('./appointmentData');
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedAppointment();
  
  process.exit(0);
};

seedAll();
