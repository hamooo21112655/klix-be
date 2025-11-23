const express = require('express');
const {
  createUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} = require('./user.service.js');

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  try {
    const newUser = await createUserService(req.body);
    return res.status(200).json({ message: 'Added new user', newUser });
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.message });
  }
});

userRouter.get('/', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  try {
    const users = await getUsersService(page, limit);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.message });
  }
});

userRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const user = await getUserByIdService(id);
    const updatedUser = await updateUserService(user, req.body);
    return res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.message });
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const rawId = req.params.id;
    const user = await getUserByIdService(rawId);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.message });
  }
});

// login
// registracija
// reset password

module.exports = {
  userRouter,
};
