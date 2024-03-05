import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import bcrypt from 'bcryptjs';

import User from '../models/user'; // Assuming your User model is defined

interface DoneCallback {
	(err: Error | null, user?: any): void;
}

// Local Strategy
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				const existingUser = await User.findOne({ email });

				if (existingUser?.password) {
					const isPasswordMatch = await bcrypt.compare(
						password,
						existingUser.password
					);
					return done(null, isPasswordMatch ? existingUser : false);
				} else {
					const hashedPassword = await bcrypt.hash(password, 10);
					const newUser = new User({
						email,
						password: hashedPassword,
					});
					await newUser.save();
					return done(null, newUser);
				}
			} catch (err) {
				return done(err);
			}
		}
	)
);

//GitHub Strategy
passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
			callbackURL: 'http://localhost:3000/auth/github/callback',
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: Profile,
			done: DoneCallback
		) => {
			try {
				let user = await User.findOne({ githubId: profile.id });

				if (user) {
					return done(null, user);
				} else {
					const newUser = new User({
						id: profile.id,
						username: profile.username,
						email:
							profile.emails && profile.emails[0]
								? profile.emails[0].value
								: null, // Or provide a default
						githubId: profile.id,
					});
					await newUser.save();
					return done(null, newUser);
				}
			} catch (err) {
				if (err instanceof Error) {
					return done(err);
				} else {
					return done(new Error('Unexpected error')); // Handle non-error types
				}
			}
		}
	)
);

// Serialization / Deserialization
passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

export default passport;
