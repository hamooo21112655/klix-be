const express = require('express');
const {
  createUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} = require('./user.service.js');

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  console.log("added neww user")
  try {
    const newUser = await createUserService(req.body);
    return res.status(200).json({ message: 'Added new user', newUser });
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.message });
  }
});

userRouter.get('/', async (req, res) => {
  const { page: rawPage = 1, limit: rawLimit = 20 } = req.query;
  try {
    const users = await getUsersService(rawPage, rawLimit);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.message });
  }
});

userRouter.get('/:id', async (req, res) => {
  const rawId = req.params.id;
  try {
    const user = await getUserByIdService(rawId);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.message });
  }
});

userRouter.put('/:id', async (req, res) => {
  const rawId = req.params.id; 
  try {
    const updatedUser = await updateUserService(rawId, req.body);
    return res.status(200).json({ message: 'User updated successfully', updatedUser });
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
