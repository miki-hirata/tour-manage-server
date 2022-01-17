'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventCat = sequelize.define('EventCat' ,{
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    }
  }, {});
  EventCat.associate = function(models){
    EventCat.hasMany(models.Event);
  }; 
  return EventCat;
};

/* const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventCat extends Model {
    static associate(models) {
      // define association here
    }
  }
  EventCat.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EventCat',
  });
  
  EventCat.associate = function(models){
    EventCat.hasMany(models.Event);
  }; 
  return EventCat;
}; */