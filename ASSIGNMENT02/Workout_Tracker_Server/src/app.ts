import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import hbs from 'hbs';
import passport from 'passport';
import * as dotenv from 'dotenv'; // Slightly adjusted import style
import * as path from 'path';

// Import your routes
import authRoutes from './routes/auth';

// Later you'll import routes here

const app = express();

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

mongoose
	.connect(process.env.DB_CONNECTION_STRING!)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Database connection error:', err));

// View engine setup
app.set('views', path.join(__dirname, '../views')); // Adjust if views are in a different location
app.set('view engine', 'hbs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'supersecret',
		resave: false,
		saveUninitialized: false,
		// Consider using a persistent session store for production (e.g., connect-mongo)
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Routes...

app.use('/auth', authRoutes);

// Error Handling...

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
