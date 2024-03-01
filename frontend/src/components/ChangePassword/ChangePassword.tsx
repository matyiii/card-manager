import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Modal from '/@/components/Modals/Modal/Modal';
import { ChangePasswordPayload, User } from '/@/shared';
import DataService from '/@/service/DataService';
import { Alert, Grid } from '@mui/material';
import { useState } from 'react';

type Props = {
	user: User;
	close: Function;
	onSuccess: Function;
};

const ChangePassword = ({ user, close, onSuccess }: Props) => {
	/* State */
	const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean | null>(null);
	const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState<boolean | null>(null);

	/* Functions */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const payload: ChangePasswordPayload = {
			currentPassword: data.get('currentPassword'),
			newPassword: data.get('newPassword')
		};

		if (payload.newPassword.length < 6) {
			setIsNewPasswordValid(false);
		} else {
			DataService.user
				.changePassword(payload)
				.then((res) => {
					const passwordChangedAt = res.data?.passwordLastChange;

					setIsNewPasswordValid(null);
					setIsCurrentPasswordValid(null);
					onSuccess({ ...user, passwordLastChanged: passwordChangedAt });
				})
				.catch((err) => {
					console.log(err);
					if (err.response.data == 'Incorrect current password') {
						setIsCurrentPasswordValid(false);
					}
				});
		}
	};

	return (
		<Modal handleClose={close}>
			<Container component='main' maxWidth='xs'>
				<Typography component='h1' variant='h5'>
					Change Password
				</Typography>
				<Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<Grid container spacing={2}>
						{isCurrentPasswordValid === false && (
							<Grid item xs={12}>
								<Alert variant='outlined' severity='error'>
									Current Password is invalid!
								</Alert>
							</Grid>
						)}
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name='currentPassword'
								label='Current Password'
								type='password'
								id='currentPassword'
								autoFocus
							/>
						</Grid>
						{isNewPasswordValid === false && (
							<Grid item xs={12}>
								<Alert variant='outlined' severity='error'>
									New Password must be at least 6 characters long
								</Alert>
							</Grid>
						)}
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name='newPassword'
								label='New Password'
								type='password'
								id='newPassword'
							/>
						</Grid>
					</Grid>
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Change Password
					</Button>
				</Box>
			</Container>
		</Modal>
	);
};

export default ChangePassword;
