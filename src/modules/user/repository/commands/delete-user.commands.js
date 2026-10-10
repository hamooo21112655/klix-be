const db = require('../../../../../models/index.js');

const { User } = db;

const deleteUser = async (userId) => {
  return User.destroy({ where: { user_id: userId } });
};

module.exports = {
  deleteUser,
};
