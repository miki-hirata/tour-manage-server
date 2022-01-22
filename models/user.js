'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User' ,{
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        min: 6
      }
    },
    removed: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models){
    User.hasMany(models.PlaceMemo);
  }; 
  return User;
};
