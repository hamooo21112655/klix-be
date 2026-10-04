const express = require('express');
const { loginUserService, registerUserService } = require('./auth.service');

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  console.log('user test');
  try {
    const user = await loginUserService(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

authRouter.post('/register', async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  authRouter,
};
