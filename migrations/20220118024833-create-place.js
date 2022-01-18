'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      memo: {
        type: Sequelize.STRING
      },
      removed: {
        type: Sequelize.BOOLEAN
      },
      favorite: {
        type: Sequelize.BOOLEAN
      },
      country: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      prefecture: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      fax: {
        type: Sequelize.STRING
      },
      PlaceCatId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Places');
  }
};