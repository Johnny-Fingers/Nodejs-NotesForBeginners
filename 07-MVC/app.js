// MVC is a design patter used to implement user interfaces, data, and controlling logic. MVC provides a separation of concerns, which means a better division of labor
// and improved maintenance.
// Model: Manages data and business logic.
// View: Handles layout and display.
// Controller: Routes commands to the model and view parts.

// In this way, the code is easy to read and, if you need to do a change, you'll only need to change one file. Let's see the following code:
// Here, we are running the server, using two middlewares (cors and json) and setting a router to a base url.

import express from 'express';
import { productsRouter } from './routes/products.js';
import { corsMiddleware } from './middlewares/cors.js';

const PORT = 3000;
const app = express();

app.use(corsMiddleware());

app.use(express.json());

app.use('/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});