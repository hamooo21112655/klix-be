const userAlreadyExistsError = () => {
  throw Error('User already exists');
};

const userNotFoundError = () => {
  throw Error('User with provided email does not exist');
};

const incorrectPasswordError = () => {
  throw Error('Email or password is wrong');
};

module.exports = {
  userAlreadyExistsError,
  userNotFoundError,
  incorrectPasswordError,
};
