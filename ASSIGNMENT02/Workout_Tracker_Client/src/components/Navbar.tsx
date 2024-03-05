import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Example icon

function Navbar() {
	return (
		<AppBar
			position="fixed"
			sx={{
				boxShadow: 0,
				backgroundImage: 'none',
				mt: 2,
			}}>
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					Workout Tracker
				</Typography>
				<Button color="inherit">Login</Button> {/* Example button */}
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
