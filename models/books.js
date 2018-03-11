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
      type: DataTypes.STRING,
    },
  }, {});
  Books.associate = (models) => {
    // associations can be defined here
    const {
      Info,
    } = models;

    Books.belongsToMany(Info, {
      through: 'InformationHolder',
    });
    Info.belongsToMany(Books, {
      through: 'InformationHolder',
    });
    // Books.belongsTo(author, {
    //   foreignKey: {
    //     allowNull: false,
    //   },
    //   onDelete: 'CASCADE',
    // });
    // Books.belongsTo(publishing, {

    //   foreignKey: {
    //     allowNull: false,
    //   },
    //   onDelete: 'CASCADE',
    // });
    // Books.belongsTo(website, {
    //   foreignKey: {
    //     allowNull: false,
    //   },
    //   onDelete: 'CASCADE',
    // });
  };
  return Books;
};
