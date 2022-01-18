'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event' ,{
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    },
    date: {
      type: DataTypes.DATE,
      validate: {notEmpty: true}
    },
    PlaceId: DataTypes.INTEGER,
    TourId: DataTypes.INTEGER,
    EventCatId: DataTypes.INTEGER,
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