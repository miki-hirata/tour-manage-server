'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tour = sequelize.define('Tour' ,{
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    },
    iconColor: DataTypes.INTEGER,
    memo: DataTypes.STRING,
    removed: DataTypes.BOOLEAN,
    favorite: DataTypes.BOOLEAN,
    done: DataTypes.BOOLEAN
  }, {});
  Tour.associate = function(models){
  Tour.hasMany(models.Event);
  }; 
  return Tour;
};

/* const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    static associate(models) {
      // define association here
    }
  }
  Tour.init({
    name: DataTypes.STRING,
    iconColor: DataTypes.INTEGER,
    memo: DataTypes.STRING,
    removed: DataTypes.BOOLEAN,
    favorite: DataTypes.BOOLEAN,
    done: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tour',
  });
  
  associate = function(models){
    Place.hasMany(models.Tour);
  }; 
  Tour.
  return Tour;
}; */