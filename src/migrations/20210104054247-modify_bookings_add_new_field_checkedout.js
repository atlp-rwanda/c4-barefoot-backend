'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Bookings',
        'checkedout',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Bookings', 'checkedout')
    ]);
  },
};


