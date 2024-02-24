// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Import your Student model

// READ (Display all students)
router.get('/', async (req, res) => {
	try {
		const students = await Student.find();

		res.render('../views/students/index.ejs', { students: students });
	} catch (err) {
		console.error(err);
		res.render('error', { error: err }); // You'll need an error view
	}
});

// CREATE (New Student Form)
router.get('/add', (req, res) => {
	res.render('students/add');
});

// CREATE (Handle Form Submission)
router.post('/', async (req, res) => {
	try {
		const student = new Student(req.body);
		await student.save();
		res.redirect('/students'); // Redirect to the list of students
	} catch (err) {
		console.error(err);
		res.render('error', { error: err });
	}
});
// ... other CRUD routes

module.exports = router;
