import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import DataService from '/@/service/DataService';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
	/* Hooks */
	const navigate = useNavigate();

	/* Functions */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const payload = {
			email: data.get('email'),
			password: data.get('password')
		};

		DataService.auth
			.login(payload)
			.then((res) => {
				console.log(res);

				const { token, email } = res.data;
				localStorage.setItem('token', token);
				localStorage.setItem('user', email);

				console.log('navigate');
				handleReload();
			})
			.catch((err) => {
				//TODO: show failed validations
				console.log(err);
			});
	};

	const handleReload = () => {
		navigate('/profile');

		//TODO: ContextProvider / Redux for a better solution instead of hard reload
		window.location.reload();
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Typography component='h1' variant='h5'>
				Sign in
			</Typography>
			<Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<TextField
					margin='normal'
					required
					fullWidth
					id='email'
					label='Email Address'
					name='email'
					autoComplete='email'
					autoFocus
					//value='user@example.com'
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					autoComplete='current-password'
					//value='string'
				/>

				<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
					Sign In
				</Button>
				<Grid container>
					<Grid item xs>
						<NavLink to='/reset-password' className='link'>
							Forgot password?
						</NavLink>
					</Grid>
					<Grid item>
						<NavLink to='/register' className='link'>
							{"Don't have an account? Sign Up"}
						</NavLink>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default Login;
