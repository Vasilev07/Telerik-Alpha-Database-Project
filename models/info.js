'use strict';
module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define('Info', {
    info: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ['info', 'value'],
    }],
  });
  Info.associate = (models) => {
    // associations can be defined here
  };
  return Info;
};
