import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import DataService from '/@/service/DataService';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const ResetPassword = () => {
	/* States */
	const [resetResponse, setResetResponse] = useState<string>('');

	/* Functions */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const payload = {
			email: data.get('email')
		};

		console.log(payload);

		DataService.auth
			.passwordReset(payload)
			.then((res) => {
				setResetResponse(res.data);
			})
			.catch((err) => {
				setResetResponse(err.message);
			});
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Typography component='h1' variant='h5'>
				Reset Password
			</Typography>
			<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin='normal'
					required
					fullWidth
					id='email'
					label='Email Address'
					name='email'
					autoComplete='email'
					autoFocus
				/>

				<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
					Reset Password
				</Button>
				<Grid container justifyContent='flex-end'>
					<Grid item>
						<NavLink to='/login' className='link'>
							Sign in
						</NavLink>
					</Grid>
				</Grid>
			</Box>

			{resetResponse && (
				<Snackbar open={Boolean(resetResponse)} autoHideDuration={7000}>
					<Alert variant='outlined' severity='info'>
						{resetResponse}
					</Alert>
				</Snackbar>
			)}
		</Container>
	);
};

export default ResetPassword;
