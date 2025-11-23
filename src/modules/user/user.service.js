const { createUser } = require('./repository/commands/create-user.commands.js');
const { updateUser } = require('./repository/commands/update-user.commands.js');
const { getUserById } = require('./repository/query/get-user-by-id.query.js');
const { getAllUsers } = require('./repository/query/get-users.query.js');

const {
  createUserSchema,
  isPhoneNumberTaken,
} = require('./validations/create-user.validations.js');
const { ensureUserExists, getUserSchema, isUserIdValid, isUserIdInvalid } = require('./validations/get-user-by-id.validations.js');
const { getUsersSchema } = require('./validations/get-users.validations.js');
const {
  throwInvalidLimitOrPageError,
  throwUserNotFoundError,
  throwPhoneNumberTakenError,
  throwInvalidUserError,
  throwEmailTakenError,
  throwUserWithNonIntegerId,
  throwInvalidUserIdError,
} = require('./exceptions/bad-user-request.exception');
const { getUsersByPhoneNumber } = require('./repository/query/get-user-by-phone-number.query');
const { isEmailTaken } = require('./validations/create-user.validations');
const { getUsersByEmail } = require('./repository/query/get-user-by-email.query');

const createUserService = async (userDTO) => {
  const getUsersByPhoneNumber = await getUsersByPhoneNumberService(userDTO.phone_number);
  if (isPhoneNumberTaken(getUsersByPhoneNumber)) throwPhoneNumberTakenError();

  const getUsersByEmail = await getUsersByEmailService(userDTO.email);
  if (isEmailTaken(getUsersByEmail)) throwEmailTakenError();
  
  const { error } = createUserSchema.validate(userDTO);
  if (error) throwInvalidUserError(error);
  return createUser(userDTO);
};

const updateUserService = async (rawId, newUser) => {
  const getUsersByPhoneNumber = await getUsersByPhoneNumberService(newUser.phone_number);
  if (isPhoneNumberTaken(getUsersByPhoneNumber)) throwPhoneNumberTakenError();

  const getUsersByEmail = await getUsersByEmailService(newUser.email);
  if (isEmailTaken(getUsersByEmail)) throwEmailTakenError();

  const { error } = createUserSchema.validate(newUser);
  if (error) throwInvalidUserError(error);
  const userById = await getUserByIdService(rawId);
  return updateUser(userById, newUser);
};

const getUsersService = async (page, limit) => {
  const { error } = getUsersSchema.validate({ page, limit });
  if (error) {
    throwInvalidLimitOrPageError(error);
    return;
  }
  return getAllUsers(page, limit);
};

const getUserByIdService = async (rawId) => {
  const id = Number(rawId);
  if (isUserIdInvalid(id)) throwInvalidUserIdError();
  const user = await getUserById(id);
  const { error } = ensureUserExists(user, id); // errorExist umjesto error
  if (error) throwUserNotFoundError(error);
  return user;
};

const getUsersByPhoneNumberService = async (phoneNumber) => {
  return getUsersByPhoneNumber(phoneNumber);
};

const getUsersByEmailService = async (email) => {
  return getUsersByEmail(email);
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
