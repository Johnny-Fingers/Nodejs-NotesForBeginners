// Sometimes, you will need middlewares to execute a function in an specific moment of the request-response cycle.
// To keep information organized, we should create a folder containing all the middlewares as a function.
// Then, we can export the function and import it in the respective file.
import cors from 'cors';

const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:1234'
]

export const corsMiddleware = ({ allowedOrigins = ALLOWED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Origin not allowed"));
        }
    });
}