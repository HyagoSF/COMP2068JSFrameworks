// routes/workouts.ts
import express from 'express';
import Workout from '../models/workout';
// ... other imports

const router = express.Router();

// Get all workouts (consider limiting/pagination for large datasets)
router.get('/', async (req, res) => {
	// ... authentication check (only logged-in users should access this)
	if (!req.user) {
		return res.status(401).json({ message: 'Unauthorized' });
	} else {
		const workouts = await Workout.find({ userId: req.user._id }); // Assuming you tie workouts to users
		res.json(workouts);
	}
	// const workouts = await Workout.find({ userId: req.user._id }); // Assuming you tie workouts to users
	// res.json(workouts);
});

// Create new workout
router.post('/', async (req, res) => {
	// ... authentication check
	const workout = new Workout({
		...req.body,
		userId: req.user._id,
	});
	await workout.save();
	res.status(201).json(workout);
});

// Update exercise within a workout
router.put('/:workoutId/exercises/:exerciseId', async (req, res) => {
	// ... authentication check
	const workout = await Workout.findById(req.params.workoutId);
	// ... error handling if workout isn't found

	const exercise = workout?.exercises.id(req.params.exerciseId);
	// ... error handling if exercise isn't found

	exercise.weightHistory.push({ weight: req.body.weight });
	await workout?.save();
	res.json(workout);
});

// ... other routes (Delete, Get single workout, etc.)
