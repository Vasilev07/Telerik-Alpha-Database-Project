'use strict';
module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define('Info', {
    info: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
  }, {});
  Info.associate = (models) => {
    // associations can be defined here
  };
  return Info;
};
