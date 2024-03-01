import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Snackbar } from '@mui/material';

import { NavLink } from 'react-router-dom';
import DataService from '/@/service/DataService';

export default function SignUp() {
	/* States */
	const [isRegisterSuccesful, setIsRegisterSuccesful] = useState<boolean>(false);

	/* Functions */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const payload = {
			firstName: data.get('firstName'),
			lastName: data.get('lastName'),
			email: data.get('email'),
			password: data.get('password'),
		};

		console.log(payload);

		DataService.auth
			.register(payload)
			.then((res) => {
				console.log(res);
				setIsRegisterSuccesful(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Typography component='h1' variant='h5'>
				Sign up
			</Typography>
			<Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12}>
						<TextField
							required
							fullWidth
							id='firstName'
							label='First Name'
							name='firstName'
							autoComplete='firstName'
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextField
							required
							fullWidth
							id='lastName'
							label='Last Name'
							name='lastName'
							autoComplete='lastName'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='new-password'
						/>
					</Grid>
				</Grid>
				<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
					Sign Up
				</Button>
				<Grid container justifyContent='flex-end'>
					<Grid item>
						<NavLink to='/login' className='link'>
							Already have an account? Sign in
						</NavLink>
					</Grid>
				</Grid>
			</Box>

			<Snackbar
				open={isRegisterSuccesful}
				autoHideDuration={5000}
				onClose={() => setIsRegisterSuccesful(false)}
			>
				<Alert variant='outlined' severity='success'>
					Registration successful!
				</Alert>
			</Snackbar>
		</Container>
	);
}
