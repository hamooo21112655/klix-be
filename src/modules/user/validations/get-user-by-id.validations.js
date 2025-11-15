const ensureUserExists = (user, id) => {
  let error;
  if (!user) {
    error = {};
    error.message = `User with ID ${id} not found`;
    error.status = 404;
  }
  return {
    data: user,
    error,
  };
};

module.exports = {
  ensureUserExists,
};
