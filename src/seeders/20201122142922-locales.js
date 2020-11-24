import locales from '../utils/locales';

export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Locales', [
      {
        locale: locales.french
      },
      {
        locale: locales.english
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Locales', null, {});
  }
};
