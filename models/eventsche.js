'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventSche = sequelize.define('EventSche' ,{
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    },
    EventId: {
      type: DataTypes.INTEGER,
      validate: {notEmpty: true}
    },
    time: DataTypes.TIME,
    memo: DataTypes.STRING,
  }, {});
  EventSche.associate = function(models){
    EventSche.belongsTo(models.Event);
  }; 
  return EventSche;
};