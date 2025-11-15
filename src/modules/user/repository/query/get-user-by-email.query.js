const db = require('../../../../../models/index.js');

const { User } = db;

const getUsersByEmail = async (email) => {
  return User.findAll({ where: { email: email } });
};

module.exports = {
  getUsersByEmail,
};
