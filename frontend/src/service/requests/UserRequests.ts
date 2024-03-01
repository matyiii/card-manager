import Api from '../Api';
import { ChangePasswordPayload, UpdateNamePayload } from '/@/shared';

export const UserRequests = {
	getUserData: () => {
		return Api.get('/User/getUserData');
	},

	updateName: (payload: UpdateNamePayload) => {
		return Api.patch('/User/updateName', {
			firstname: payload.firstName,
			lastname: payload.lastName
		});
	},

	changePassword: (payload: ChangePasswordPayload) => {
		return Api.post('/User/changePassword', {
			currentPassword: payload.currentPassword,
			newPassword: payload.newPassword
		});
	}
};
