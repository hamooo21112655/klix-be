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

const isUserIdInvalid = (id) => {
  return Number.isNaN(id) || !Number.isInteger(id);
}

module.exports = {
  ensureUserExists,
  isUserIdInvalid
};
