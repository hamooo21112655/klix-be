const { createUser } = require('./repository/commands/create-user.commands.js');
const { updateUser } = require('./repository/commands/update-user.commands.js');
const { getUserById } = require('./repository/query/get-user-by-id.query.js');
const { getAllUsers } = require('./repository/query/get-users.query.js');

const {
  createUserSchema,
  isEmailOrPhoneNumberTaken
} = require('./validations/create-user.validations.js');

const { getUsersSchema } = require('./validations/get-users.validations.js');
const {
  throwInvalidLimitOrPageError,
  throwUserNotFoundError,
  throwInvalidUserError,
  throwInvalidUserIdError,
  throwEmailOrPhoneNumberTakenError
} = require('./exceptions/bad-user-request.exception');
const { getUsersByPhoneNumber } = require('./repository/query/get-user-by-phone-number.query');
const { getUsersByEmail } = require('./repository/query/get-user-by-email.query');
const { userIdSchema } = require('./validations/get-user-by-id.validations.js');

const createUserService = async (userDTO) => {
  const { error } = createUserSchema.validate(userDTO);
  if (error) throwInvalidUserError(error);

  const getUsersByPhoneNumberOrEmail = await getUsersByEmailOrPhoneNumberService(userDTO);
  const mailAndPhoneNumberAreValid = isEmailOrPhoneNumberTaken(getUsersByPhoneNumberOrEmail);

  if (mailAndPhoneNumberAreValid) {
    throwEmailOrPhoneNumberTakenError();
  }

  return createUser(userDTO);
};

const updateUserService = async (rawId, newUser) => {
  const { error } = createUserSchema.validate(newUser);
  if (error) {
    throwInvalidUserError(error);
  }

  const getUsersByPhoneNumberOrEmail = await getUsersByEmailOrPhoneNumberService(newUser);
  const mailAndPhoneNumberAreInvalid = isEmailOrPhoneNumberTaken(getUsersByPhoneNumberOrEmail);

  if (mailAndPhoneNumberAreInvalid) {
    throwEmailOrPhoneNumberTakenError();
  }

  const userById = await getUserByIdService(rawId);
  return updateUser(userById, newUser);
};

const getUsersService = async (page, limit) => {
  const { error, value } = getUsersSchema.validate({ page, limit });

  if (error) {
    throwInvalidLimitOrPageError(error);
  }

  return getAllUsers(value.page, value.limit);
};

const getUserByIdService = async (rawId) => {
  const { value, error } = userIdSchema.validate({ id: rawId });

  if (error) {
    throwInvalidUserIdError(error);
  }

  const user = await getUserById(value.id);

  if (!user) {
    throwUserNotFoundError({
      message: `User with id ${value?.id} not found.`
    });
  }

  return user;
};

const getUsersByPhoneNumberService = async (phoneNumber) => getUsersByPhoneNumber(phoneNumber);
const getUsersByEmailService = async (email) => getUsersByEmail(email);

const getUsersByEmailOrPhoneNumberService = async ({ phoneNumber, email }) => {
  let usersByEmailOrPhoneNumber = [];

  if (!phoneNumber && !email) return [];

  const usersByNumber = await getUsersByPhoneNumberService(phoneNumber || "");
  if (usersByNumber.length > 0) {
    usersByEmailOrPhoneNumber.push(...usersByNumber);
  }
  
  const usersByEmail = await getUsersByEmailService(email || "");
  if (usersByEmail.length > 0) {
    usersByEmailOrPhoneNumber.push(...usersByEmail);
  }

  return usersByEmailOrPhoneNumber;
}

// soft delete-usera
// alter tabele - migracija - deletedAt kolona

module.exports = {
  createUserService,
  updateUserService,
  getUsersService,
  getUserByIdService,
  getUsersByPhoneNumberService,
};
