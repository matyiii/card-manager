import { useEffect, useState } from 'react';
import DataService from '/@/service/DataService';
import { AccountType } from '/@/shared';
import Account from '/@/components/Account/Account';

import './Accounts.scss';

const Accounts = () => {
	/* States */
	const [accounts, setAccounts] = useState<AccountType[]>();

	/* Effects */
	useEffect(() => {
		DataService.account
			.getAccounts()
			.then((res) => setAccounts(res.data.accounts))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<h1>Accounts</h1>

			<ul className='accounts'>
				{accounts?.map((acc: AccountType) => (
					<Account account={acc} key={acc.id} />
				))}
			</ul>
		</div>
	);
};

export default Accounts;
