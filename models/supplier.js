'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Supplier.init({
    supplierId: {
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    laundryId: DataTypes.BIGINT,
    point: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};