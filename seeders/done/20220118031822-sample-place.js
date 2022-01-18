'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Places', [
      {
        name: '新潟県民会館',
        memo: '白山神社近くの大きな会館。',
        favorite: false,
        removed: false,
        country: '日本',
        postalCode: '9439909',
        prefecture: '新潟県',
        city: '新潟市',
        street: '白山1-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        PlaceCatId: 1
      }
    ], {});
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Places', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
