import roles from '../utils/roles';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
      {
        id: roles.SUPER_ADMIN,
        name: 'administrator',
        description: 'This is the super administrator of Barefoot Nomad'
      },
      {
        id: roles.REQUESTER,
        name: 'requester',
        description:'This is a normal user of Barefoot Nomad'
      },
     
    ], {}),


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
