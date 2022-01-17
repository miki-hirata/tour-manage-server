'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      placeId: {
        type: Sequelize.INTEGER
      },
      tourId: {
        type: Sequelize.INTEGER
      },
      eventCatId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Events');
  }
};