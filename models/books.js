'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    Title: {
      type: DataTypes.STRING,
    },
    Image: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.TEXT,
    },
    ISBN: {
      type: DataTypes.TEXT,
    },
    Publishing: {
      type: DataTypes.STRING,
    },
  }, {});
  Books.associate = (models) => {
    // associations can be defined here
  };
  return Books;
};
