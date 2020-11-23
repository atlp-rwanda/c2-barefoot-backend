import locales from '../utils/locales';

export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Locales', [
      {
        id: locales.french,
        locale: 'fr'
      },
      {
        id: locales.english,
        locale: 'en'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Locales', null, {});
  }
};
