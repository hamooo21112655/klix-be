const express = require('express');
const { userRouter } = require('./src/modules/user/user.routes.js');
const { articleRouter } = require('./src/modules/articles/articles.routes.js');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/article', articleRouter);

// treba pingati bazu da provjerimo konekciju ili na nivou orm-a

app.listen(3000, () => console.log('Listening on port 3000'));
