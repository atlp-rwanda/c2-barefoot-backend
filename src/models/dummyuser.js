'use strict';
// const {Model} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const dummyUser = sequelize.define('DummyUser',
    {
      Name: {
        allowNull: false,
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
    }
  )
  return dummyUser;
};