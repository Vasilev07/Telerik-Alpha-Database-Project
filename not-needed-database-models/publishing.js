'use strict';
module.exports = (sequelize, DataTypes) => {
  const publishing = sequelize.define('publishing', {
    publishing: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {});
  publishing.associate = (models) => {
    // associations can be defined here
  };
  return publishing;
};
