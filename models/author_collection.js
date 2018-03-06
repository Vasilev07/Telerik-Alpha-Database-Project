'use strict';
module.exports = (sequelize, DataTypes) => {
  const authorCollection = sequelize.define('author_collection', {
    author: {
      type: DataTypes.STRING,
    },
  }, {});
  authorCollection.associate = (models) => {
    // associations can be defined here
  };
  return authorCollection;
};
