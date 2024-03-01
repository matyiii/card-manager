import Api from '../Api';
import { LoginPayload, RegisterPayload, ResetPasswordPaylod } from '../../shared';

export const AuthRequests = {
	login: (payload: LoginPayload) => {
		return Api.post('/User/login', {
			email: payload.email,
			password: payload.password
		});
	},

	register: (payload: RegisterPayload) => {
		return Api.post('/User/register', {
			firstName: payload.firstName,
			lastName: payload.lastName,
			email: payload.email,
			password: payload.password
		});
	},

	passwordReset: (payload: ResetPasswordPaylod) => {
		return Api.post('/User/passwordReset', { email: payload.email });
	}
};
