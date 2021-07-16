import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerJson from './docs/swagger.json';
import { usersRoutes } from './routes/users.routes';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/users', usersRoutes);

export { app };
