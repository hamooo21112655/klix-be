const throwInvalidLimitOrPageError = (error) => {
  throw new Error(error.details[0].message);
};

const throwPhoneNumberTakenError = () => {
  throw new Error('Phone number already taken');
};

const throwEmailTakenError = () => {
  throw new Error('Email already taken');
};

const throwUserNotFoundError = (error) => {
  throw new Error(error.message);
};

const throwInvalidUserError = (error) => {
  throw new Error(error.details[0].message);
};

module.exports = {
  throwInvalidLimitOrPageError,
  throwPhoneNumberTakenError,
  throwUserNotFoundError,
  throwInvalidUserError,
  throwEmailTakenError,
};
