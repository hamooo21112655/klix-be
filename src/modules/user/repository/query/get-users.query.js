const db = require('../../../../../models/index.js');

const { User } = db;

const getAllUsers = async (page, limit) => {
  const offset = (page - 1) * limit;

  const { rows, count } = await User.findAndCountAll({
    limit,
    offset,
  });

  return {
    page,
    limit,
    totalPages: Math.ceil(count / limit),
    data: rows,
  };
};

module.exports = { getAllUsers };
