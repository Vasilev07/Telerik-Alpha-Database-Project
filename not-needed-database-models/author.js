'use strict';
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    authorName: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {});
  author.associate = (models) => {
    // associations can be defined here
  };
  return author;
};
