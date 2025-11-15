const db = require('../../../../../models/index.js');

const { User } = db;

const getUsersByPhoneNumber = async (phoneNumber) => {
  return User.findAll({ where: { phone_number: phoneNumber } });
};

module.exports = {
  getUsersByPhoneNumber,
};
