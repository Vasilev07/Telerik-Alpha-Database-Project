'use strict';
module.exports = (sequelize, DataTypes) => {
  const InformationHolder = sequelize.define('InformationHolder', {
    BookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    InfoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

  }, {});
  InformationHolder.associate = (models) => {
    const {
      Info,
      Books,
    } = models;

    InformationHolder.belongsTo(Books);
    InformationHolder.belongsTo(Info);
  };
  return InformationHolder;
};
