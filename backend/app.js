import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import { connectDB } from './database/database.js';
import { config } from './config/config.js';
import { postRoute } from './router/postRoute.js';
import { commentRoute } from './router/commentRoute.js';
import { planningRoute } from './router/planningRouter.js';
import { user_route } from './router/userRouter.js';
import { expressjwt } from 'express-jwt';

//where auth does not needed

const app = express();

// Set up utility middlewares
app.use(express.urlencoded({ extended: false })); //used to parse requests
app.use(express.json()); // used to parse incoming JSON data from HTTP requests that have a content-type of application/json.
app.use(helmet()); // helps to secure web applications by setting various HTTP headers. These headers provide an additional layer of security to prevent attacks such as cross-site scripting (XSS), clickjacking, and other known web vulnerabilities.
app.use(cors()); // enables Cross-Origin Resource Sharing (CORS) for an Express application.
app.use(morgan('tiny')); // logs HTTP request details to the console in a 'tiny' (easy to read) format.


// Routes
app.use('/posts', postRoute);
app.use('/comments', commentRoute);
app.use('/plans', planningRoute);
app.use('/user', user_route);


// set token check, routes declared below will be checked for token
app.use(
  expressjwt({ secret: config.jwt.encoding, algorithms: ['HS256'] }));

// since we have some router logic to prevent user from accessing certain page by entering url
// also the structure how we deploy the route in the backend and how we use useEffect() in the frontend
// it's not a proper way to use jwt to cover a route in a whole.
// instead, we left some use cases in userController to protect some api




// Handles requests on unexisting URLs
app.use((req, res, next) => {
  res.sendStatus(404);
});

// Handles server errors
app.use((error, req, res, next) => {
  console.error(error);
  if (error.name === 'UnauthorizedError') {
    res.status(401).send('unable to verify authentication');
    return;
  }
  res.sendStatus(500);
});

connectDB().then(() => {
  app.listen(config.host.port, () => {
    console.log(`Server listening on port ${config.host.port}`);
  });
});
