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
    fax: DataTypes.STRING,
    PlaceCatId: DataTypes.INTEGER
  }, {});
  
  Place.associate = function(models){
    Place.hasMany(models.Event);
    Place.hasMany(models.PlaceMemo);
    Place.belongsTo(models.PlaceCat);
  }; 
  return Place;
};