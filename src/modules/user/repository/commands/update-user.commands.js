const updateUser = async (user, updates) => {
  Object.assign(user, updates);
  user.save();
  return user;
};

module.exports = {
  updateUser,
};
