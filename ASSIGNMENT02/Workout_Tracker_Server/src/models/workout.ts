// models/workout.ts
import mongoose from 'mongoose';

interface Exercise {
	// id: string;
	name: string;
	weightHistory: {
		weight: number;
		date: Date;
	}[];
}

interface WorkoutAttributes {
	date: Date;
	exercises: Exercise[];
	// You can add optional fields like 'notes' here
}

const workoutSchema = new mongoose.Schema<WorkoutAttributes>({
	date: { type: Date, default: Date.now },
	exercises: [
		{
			name: { type: String, required: true },
			weightHistory: [
				{
					weight: { type: Number, required: true },
					date: { type: Date, default: Date.now },
					unit: { type: String, default: 'lb' },
				},
			],
		},
	],
});

const Workout = mongoose.model<WorkoutAttributes>('Workout', workoutSchema);
export default Workout;
