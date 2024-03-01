import Api from '../Api';

export const AccountRequests = {
	getAccounts: () => {
		return Api.get('/Account/getAccounts');
	}
};
