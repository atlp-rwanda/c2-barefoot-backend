'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        default: Sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profile_picture: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: 'https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg',

      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      bio: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'English'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      refreshtoken: {type: Sequelize.STRING,allowNull: false,defaultValue: 'refreshtoken'},
      user_role_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      manager_id: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'Line_managers',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};