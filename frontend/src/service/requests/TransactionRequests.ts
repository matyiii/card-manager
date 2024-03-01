import Api from '../Api';

export const TransactionRequests = {
	getTranscations: () => {
		return Api.get('Transaction/getTranscations');
	}
};
