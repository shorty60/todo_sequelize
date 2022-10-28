'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(`todos`, `userID`, {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(`todos`, `userID`)
  },
}
