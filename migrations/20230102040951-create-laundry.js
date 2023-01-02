'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Laundries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      customerId: {
        type: Sequelize.BIGINT.UNSIGNED
      },
      supplierId: {
        type: Sequelize.BIGINT.UNSIGNED
      },
      status: {
        type: Sequelize.TEXT
      },
      photoURL: {
        type: Sequelize.BLOB
      },
      request: {
        type: Sequelize.STRING
      },
      cellphone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Laundries');
  }
};