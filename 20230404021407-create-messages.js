'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      messages: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      receiver: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE'),
        type: Sequelize.DATEONLY
      },
      time: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIME'),
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};