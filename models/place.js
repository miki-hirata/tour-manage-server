'use strict';

module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place' ,{
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    },
    memo: DataTypes.STRING,
    removed: DataTypes.BOOLEAN,
    favorite: DataTypes.BOOLEAN,
    country: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    prefecture: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    tel: DataTypes.STRING,
    fax: DataTypes.STRING
  }, {});
  
  Place.associate = function(models){
    Place.hasMany(models.Event);
  }; 
  return Place;
};

/* const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      // define association here
    }
  }
  Place.init({
    name: DataTypes.STRING,
    memo: DataTypes.STRING,
    removed: DataTypes.BOOLEAN,
    favorite: DataTypes.BOOLEAN,
    country: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    prefecture: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    tel: DataTypes.STRING,
    fax: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Place',
  });
  
  Place.associate = function(models){
    Place.hasMany(models.Event);
  }; 
  return Place;
}; */