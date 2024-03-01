import { AuthRequests } from './requests/AuthRequests';
import { UserRequests } from './requests/UserRequests';
import { AccountRequests } from './requests/AccountRequests';
import { CardRequests } from './requests/CardRequests';
import { TransactionRequests } from './requests/TransactionRequests';
import { AdminRequests } from './requests/AdminRequests';

export default {
	auth: AuthRequests,
	user: UserRequests,
	account: AccountRequests,
	card: CardRequests,
	transactions: TransactionRequests,
	admin: AdminRequests
};
