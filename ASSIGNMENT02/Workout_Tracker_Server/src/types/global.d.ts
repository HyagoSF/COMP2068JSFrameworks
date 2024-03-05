// types/global.d.ts
import mongoose from 'mongoose';

declare global {
	namespace Express {
		interface User extends mongoose.Document {
			// Assuming your User model extends Document
			_id: mongoose.Types.ObjectId;
			// Add other properties from your User model as needed
		}
	}
}
