const express = require('express');
const { userRouter } = require('./src/modules/user/user.routes.js');
const { articleRouter } = require('./src/modules/articles/articles.routes.js');
const { authRouter } = require('./src/modules/auth/auth.routes.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/article', articleRouter);
app.use('/auth', authRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// treba pingati bazu da provjerimo konekciju ili na nivou orm-a

app.listen(3000, () => console.log('Listening on port 3000'));
