'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Laundry.init({
    customerId: DataTypes.BIGINT,
    spplierId: DataTypes.BIGINT,
    status: DataTypes.TEXT,
    photoURL: DataTypes.BLOB,
    request: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Laundry',
  });
  return Laundry;
};