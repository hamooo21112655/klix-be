const throwInvalidLimitOrPageError = error => {
  throw new Error(error.details[0].message);
};

const throwEmailOrPhoneNumberTakenError = () => {
  throw new Error('Email or phone number already taken');
};

const throwUserNotFoundError = error => {
  const userNotFoundError = new Error(error.message);
  userNotFoundError.status = 404;
  throw userNotFoundError;
};

const throwInvalidUserError = error => {
  throw new Error(error.details[0].message);
};

const throwInvalidUserIdError = error => {
  throw new Error(error.details[0].message);
};

module.exports = {
  throwInvalidLimitOrPageError,
  throwUserNotFoundError,
  throwInvalidUserError,
  throwInvalidUserIdError,
  throwEmailOrPhoneNumberTakenError
};
