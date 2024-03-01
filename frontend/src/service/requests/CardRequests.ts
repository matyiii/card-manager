import Api from '../Api';

export const CardRequests = {
	getCards: () => {
		return Api.get('Card/getCards');
	}
};
