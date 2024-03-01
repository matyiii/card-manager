import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Modal from '/@/components/Modals/Modal/Modal';
import { UpdateNamePayload, User } from '/@/shared';
import DataService from '/@/service/DataService';
import { Grid } from '@mui/material';

type Props = {
	user: User;
	close: Function;
	onSuccess: Function;
};

const UpdateName = ({ user, close, onSuccess }: Props) => {
	/* Functions */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const payload: UpdateNamePayload = {
			firstName: data.get('firstName') as string,
			lastName: data.get('lastName') as string
		};

		DataService.user
			.updateName(payload)
			.then((res) => {
				onSuccess({ ...user, firstName: payload.firstName, lastName: payload.lastName });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Modal handleClose={close}>
			<Container component='main' maxWidth='xs'>
				<Typography component='h1' variant='h5'>
					Update Name
				</Typography>
				<Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='firstName'
								label='First Name'
								name='firstName'
								autoFocus
								defaultValue={user.firstName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin='normal'
								required
								fullWidth
								name='lastName'
								label='Last Name'
								id='lastName'
								defaultValue={user.lastName}
							/>
						</Grid>
					</Grid>

					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Update
					</Button>
				</Box>
			</Container>
		</Modal>
	);
};

export default UpdateName;
