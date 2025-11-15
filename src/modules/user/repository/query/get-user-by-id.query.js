const db = require('../../../../../models/index.js');

const { User } = db;

const getUserById = async (id) => {
  return User.findByPk(id);
};

module.exports = {
  getUserById,
};
