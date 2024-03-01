import { useEffect, useState } from 'react';
import DataService from '/@/service/DataService';
import { User } from '/@/shared';
import {
	Alert,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Snackbar,
	Typography
} from '@mui/material';
import UpdateName from '/@/components/UpdateName/UpdateName';
import useModal from '/@/hooks/useModal';
import ChangePassword from '/@/components/ChangePassword/ChangePassword';

import './Profile.scss';

const Profile = () => {
	/* States */
	const [user, setUser] = useState<User>();
	const [snackbarMessage, setSnackbarMessage] = useState<string>('');

	/* Effects */
	useEffect(() => {
		DataService.user
			.getUserData()
			.then((res) => {
				setUser(res.data);
			})
			.catch((err) => {
				console.log(err);
			});

		//window.location.reload();
	}, []);

	/* Modals */
	const {
		modalOpen: updateNameModalOpen,
		close: closeUpdateNameModal,
		open: openUpdateNameModal
	} = useModal();

	const {
		modalOpen: changePasswordModalOpen,
		close: closeChangePasswordModal,
		open: openChangePasswordModal
	} = useModal();

	return (
		<>
			<div className='profile'>
				<Card>
					<CardHeader title={`${user?.firstName} ${user?.lastName}`} />
					<CardContent>
						<Typography>{`Email: ${user?.email}`}</Typography>
						<Typography>{`Account created at: ${user?.createdAt}`}</Typography>
						<Typography>{`Last Login: ${user?.lastLogin}`}</Typography>
						{user?.passwordLastChanged && (
							<Typography>{`Password Last Changed: ${user?.passwordLastChanged}`}</Typography>
						)}
					</CardContent>
					<CardActions className='actions'>
						<Button onClick={openUpdateNameModal}>Update Name</Button>
						<Button onClick={openChangePasswordModal}>Change Password</Button>
					</CardActions>
				</Card>
			</div>

			{updateNameModalOpen && (
				<UpdateName
					user={user as User}
					close={closeUpdateNameModal}
					onSuccess={(updatedUser: User) => {
						setUser(updatedUser);
						closeUpdateNameModal();
						setSnackbarMessage('Name Updated Successfully!');
					}}
				/>
			)}

			{changePasswordModalOpen && (
				<ChangePassword
					user={user as User}
					close={closeChangePasswordModal}
					onSuccess={(updateduser: User) => {
						setUser(updateduser);
						closeChangePasswordModal();
						setSnackbarMessage('Password Changed Successfully!');
					}}
				/>
			)}

			{Boolean(snackbarMessage) && (
				<Snackbar
					open={Boolean(snackbarMessage)}
					autoHideDuration={5000}
					onClose={() => setSnackbarMessage('false')}
				>
					<Alert variant='outlined' severity='success'>
						{snackbarMessage}
					</Alert>
				</Snackbar>
			)}
		</>
	);
};

export default Profile;
