import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	// id: String,
	username: String,
	email: String,
	password: String, // For local strategy
	githubId: String, // For GitHub strategy
});

const User = mongoose.model('User', userSchema);
export default User;
