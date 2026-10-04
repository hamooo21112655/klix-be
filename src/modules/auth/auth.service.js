var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUsersByEmail } = require('../user/repository/query/get-user-by-email.query');
const { _getUserByEmailService, _createUserService } = require('../user/user.service');
const { createUser } = require('../user/repository/commands/create-user.commands');
const { isEmailTaken, createUserSchema } = require('../user/validations/create-user.validations');
const { throwInvalidUserError } = require('../user/exceptions/bad-user-request.exception');
const {
  userAlreadyExistsError,
  userNotFoundError,
  incorrectPasswordError,
} = require('./exceptions/bad-auth-request.exception');
require('dotenv').config();

const loginUserService = async (userCredentialsDTO) => {
  const { email, password } = userCredentialsDTO;
  const emailSchema = createUserSchema.extract('email');
  const { error: emailError } = emailSchema.validate(email);

  if (emailError) {
    throwInvalidUserError(emailError);
  }

  const passwordSchema = createUserSchema.extract('password');
  const { error: passwordError } = passwordSchema.validate(password);
  if (passwordError) {
    throwInvalidUserError(passwordError);
  }

  const users = await _getUserByEmailService(email);

  if (!isEmailTaken(users)) {
    userNotFoundError();
  }

  const user = users[0];

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    incorrectPasswordError();
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.user_id,
      role: user.user_type,
    },
    process.env.JWT_SECRET_KEY
  );

  return token;
};

const registerUserService = async (userCredentialsDTO) => {
  const { email, password } = userCredentialsDTO;
  const emailSchema = createUserSchema.extract('email');
  const { error } = emailSchema.validate(email);

  if (error) {
    throwInvalidUserError(error);
  }

  const passwordSchema = createUserSchema.extract('password');
  const { error: passwordError } = passwordSchema.validate(password);

  if (passwordError) {
    throwInvalidUserError(passwordError);
  }

  const user = await _getUserByEmailService(email);

  if (isEmailTaken(user)) {
    userAlreadyExistsError();
  }

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await _createUserService({
    ...userCredentialsDTO,
    password: hashedPassword,
    user_type: 'AUTHOR',
  });

  var token = await jwt.sign(
    { email: newUser.email, id: newUser.user_id, role: newUser.user_type },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

module.exports = {
  loginUserService,
  registerUserService,
};
