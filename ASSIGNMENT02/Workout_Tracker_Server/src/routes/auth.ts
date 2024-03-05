import express from 'express';
import passport from 'passport';
// import bcrypt from 'bcryptjs';
import User from '../models/user';

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
	try {
		const { email, password } = req.body;

		// Basic validation (You should add more thorough validation)
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Please provide email and password' });
		}

		// Call passport.authenticate with 'local' strategy for registration
		passport.authenticate('local', (err: any, user: any, info: any) => {
			if (err) {
				return res.status(500).json(err);
			}
			if (!user) {
				return res.status(401).json(info);
			}

			req.logIn(user, (err) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res
					.status(201)
					.json({ message: 'User registered and logged in' });
			});
		})(req, res);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Login Route
router.post('/login', passport.authenticate('local'), (req, res) => {
	res.json({ message: 'User logged in', user: req.user });
});

// Logout Route
router.get('/logout', (req, res) => {
	req.logout(
		// @ts-ignore
		req.session.destroy()
	);
	res.json({ message: 'User logged out' });
});

// GitHub Authentication Routes
router.get(
	'/auth/github',
	passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
	'/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/login' }), // Replace '/login' as needed
	(req, res) => {
		// Successful authentication, redirect to your frontend
		res.redirect('http://localhost:3000/profile'); // Adjust frontend URL
	}
);

export default router;
