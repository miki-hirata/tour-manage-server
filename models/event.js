'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event' ,{
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    },
    date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    PlaceId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    TourId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    EventCatId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    memo: DataTypes.STRING,
    removed: DataTypes.BOOLEAN,
    favorite: DataTypes.BOOLEAN
  }, {});
  Event.associate = function(models){
    Event.belongsTo(models.Place);
    Event.belongsTo(models.Tour);
    Event.belongsTo(models.EventCat);
    Event.hasMany(models.EventSche);
  }; 
  return Event;
};