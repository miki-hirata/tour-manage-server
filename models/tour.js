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