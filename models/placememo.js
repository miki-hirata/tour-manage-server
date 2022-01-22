'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaceMemo = sequelize.define('PlaceMemo' ,{
    PlaceId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    memo: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    },
    removed: DataTypes.BOOLEAN
  }, {});
  PlaceMemo.associate = function(models){
    PlaceMemo.belongsTo(models.Place);
    PlaceMemo.belongsTo(models.User);
  }; 
  return PlaceMemo;
};
