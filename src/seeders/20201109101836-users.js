import { hashPassword } from '../utils/auth';
import roles from '../utils/roles';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
      {
        id: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c',
        first_name: 'SUper',
        last_name: 'Administrator',
        username: 'administrator',
        address: 'Kigali',
        language: 'English',
        email: 'renedeolynda@gmail.com',
        password: hashPassword('Superadmin'),
        verified: true,
        user_role_id: roles.SUPER_ADMIN
      },
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        first_name: 'Ineza',
        last_name: 'Bonte',
        username: 'inezabonte',
        email: 'inezabonte@gmail.com',
        password: hashPassword('password'),
        address: 'Kigali',
        language: 'English',
        verified: true
      },
      {
        id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        first_name: 'Rene',
        last_name: 'Promesse',
        username: 'renepromesse',
        email: 'renepromesse@gmail.com',
        password: hashPassword('password'),
        address: 'Kigali',
        language: 'English',
        verified: true
      },
      {
        id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        first_name: 'Jackson',
        last_name: 'Mugabo',
        username: 'jacksonemugabo',
        email: 'jackson@gmail.com',
        password: hashPassword('password'),
        address: 'Kigali',
        language: 'English',
        verified: true
      },
      {
        id: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        first_name: 'James',
        last_name: 'Bond',
        username: 'jamesbond',
        email: 'james@gmail.com',
        password: hashPassword('password'),
        address: 'Kigali',
        language: 'English',
        verified: true
      },
      
    ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})

};

