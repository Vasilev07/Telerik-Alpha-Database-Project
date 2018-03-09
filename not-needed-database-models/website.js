'use strict';
module.exports = (sequelize, DataTypes) => {
  const website = sequelize.define('website', {
    websiteName: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {});
  website.associate = (models) => {
    // associations can be defined here
  };
  return website;
};
