import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import './MenuBar.scss';

const MenuBar = () => {
	/* Hooks */
	const navigate = useNavigate();

	/* States */
	const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

	/* Functions */
	const handleLogout = () => {
		// Clear token from localStorage and update state
		localStorage.removeItem('token');
		setToken(null);
		navigate('login');
	};

	return (
		<div className='menu-bar'>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static'>
					<Toolbar>
						<Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
							Card Manager
						</Typography>
						{token ? (
							<div className='links'>
								<Link to='/accounts'>Accounts</Link>
								<Link to='/cards'>Cards</Link>
								<Link to='/transactions'>Transactions</Link>
								<Link to='/profile'>Profile</Link>
								<Link to='/admin'>Admin</Link>
								<Button className='logout' onClick={handleLogout}>
									Logout
								</Button>
							</div>
						) : (
							<div className='links'>
								<Link to='/login'>Login</Link>
								<Link to='/register'>Register</Link>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</div>
	);
};

export default MenuBar;
