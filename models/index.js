
const User    = require('./User');
const Appointment = require('./Appointment');

User.hasMany(Appointment, {
  foreignKey: 'user_id',
});

Appointment.belongsTo(User);

module.exports = { Appointment, User};
