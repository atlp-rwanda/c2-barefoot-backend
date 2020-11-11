import roles from '../utils/roles';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Line_managers', [
    {
      id: roles.LINE_MANAGER,
      first_name: 'Line',
      last_name: 'Manager'
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Line_managers', null, {})
};
