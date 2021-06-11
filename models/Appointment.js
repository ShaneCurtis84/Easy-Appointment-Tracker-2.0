const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Appointment extends Model { }

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    appnt_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appnt_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appnt_for_whom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appnt_with_whom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appnt_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appnt_note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'appointment',
  }
);

module.exports = Appointment;
