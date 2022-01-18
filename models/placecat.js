'use strict';

module.exports = (sequelize, DataTypes) => {
  const PlaceCat = sequelize.define('PlaceCat' ,{
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    }
  }, {});
  PlaceCat.associate = function(models){
    PlaceCat.hasMany(models.Place);
  }; 
  return PlaceCat;
};