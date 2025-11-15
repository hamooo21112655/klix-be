const db = require('../../../../../models/index.js');

const { User } = db;

const createUser = async (userDTO) => {
  return User.create(userDTO);
};

module.exports = {
  createUser,
};
