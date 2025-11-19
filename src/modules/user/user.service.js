const { createUser } = require('./repository/commands/create-user.commands.js');
const { updateUser } = require('./repository/commands/update-user.commands.js');
const { getUserById } = require('./repository/query/get-user-by-id.query.js');
const { getAllUsers } = require('./repository/query/get-users.query.js');

const {
  createUserSchema,
  isPhoneNumberTaken,
} = require('./validations/create-user.validations.js');
const { ensureUserExists } = require('./validations/get-user-by-id.validations.js');
const { getUsersSchema } = require('./validations/get-users.validations.js');
const {
  throwInvalidLimitOrPageError,
  throwUserNotFoundError,
  throwPhoneNumberTakenError,
  throwInvalidUserError,
  throwEmailTakenError,
} = require('./exceptions/bad-user-request.exception');
const { getUsersByPhoneNumber } = require('./repository/query/get-user-by-phone-number.query');
const { isEmailTaken } = require('./validations/create-user.validations');
const { getUsersByEmail } = require('./repository/query/get-user-by-email.query');

const createUserService = async (userDTO) => {
  const usersByPhoneNumber = await getUsersByPhoneNumberService(userDTO.phone_number);
  const usersByEmail = await getUsersByEmail(userDTO.email);
  if (isPhoneNumberTaken(usersByPhoneNumber)) {
    throwPhoneNumberTakenError();
  }
  if (isEmailTaken(usersByEmail)) {
    throwEmailTakenError();
  }
  const { error } = createUserSchema.validate(userDTO);
  if (error) {
    throwInvalidUserError(error);
  }
  return createUser(userDTO);
};

const updateUserService = async (existingUser, newUser) => {
  const usersByPhoneNumber = await getUsersByPhoneNumberService(newUser.phone_number);
  if (isPhoneNumberTaken(usersByPhoneNumber)) {
    throwPhoneNumberTakenError();
  }
  const { error } = createUserSchema.validate(newUser);
  if (error) {
    throwInvalidUserError(error);
  }
  return updateUser(existingUser, newUser);
};

const getUsersService = async (page, limit) => {
  const { error } = getUsersSchema.validate({ page, limit });
  if (error) {
    throwInvalidLimitOrPageError(error);
    return;
  }
  return getAllUsers(page, limit);
};

const getUserByIdService = async (id) => {
  const user = await getUserById(id);
  const { error } = ensureUserExists(user, id);
  if (error) {
    throw throwUserNotFoundError(error);
  }
  return user;
};

const getUsersByPhoneNumberService = async (phoneNumber) => {
  return getUsersByPhoneNumber(phoneNumber);
};

// soft delete-usera
// alter tabele - migracija - deletedAt kolona

module.exports = {
  createUserService,
  updateUserService,
  getUsersService,
  getUserByIdService,
  getUsersByPhoneNumberService,
};
