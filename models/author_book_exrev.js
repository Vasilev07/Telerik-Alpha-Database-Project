'use strict';
module.exports = (sequelize, DataTypes) => {
  const authorBookExrev = sequelize.define('author_book_exrev', {
    authorId: {
      type: DataTypes.INTEGER,
    },
    bookId: {
      type: DataTypes.INTEGER,
    },
  }, {});
  authorBookExrev.associate = (models) => {
    // associations can be defined here
  };
  return authorBookExrev;
};
