import Api from '../Api';
import { CreateUserWithAccountAndCard } from '/@/shared';

export const AdminRequests = {
	createUserWithAccountAndCard: (payload: CreateUserWithAccountAndCard) => {
		return Api.post('Admin/createUserWithAccountAndCard', { ...payload });
	}
};
