import * as React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Navbar from './components/Navbar';

function App() {
	// verify if the user is logged in

	// if the user is not logged in, display the login form

	// if the user is logged in, display the main content

	return (
		<div>
			<Navbar />

			<Container maxWidth="md">
				{' '}
				{/* Adjust maxWidth as needed */}
				<main style={{ marginTop: '20px' }}>
					{' '}
					{/* Add spacing */}
					{/* Your main content will go here */}
				</main>
			</Container>
		</div>
	);
}

export default App;
