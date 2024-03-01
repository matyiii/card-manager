import { useEffect, useState } from 'react';
import DataService from '/@/service/DataService';
import { TranscationType } from '/@/shared';
import Transcation from '/@/components/Transaction/Transaction';

import './Transactions.scss';

const Transcations = () => {
	/* States */
	const [transactions, setTranscations] = useState<TranscationType[]>();

	/* Effects */
	useEffect(() => {
		DataService.transactions
			.getTranscations()
			.then((res) => setTranscations(res.data.transcations))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<h1>Transcations</h1>

			<ul className='transactions'>
				{transactions?.map((transaction: TranscationType) => (
					<Transcation transaction={transaction} key={transaction.id} />
				))}
			</ul>
		</div>
	);
};
export default Transcations;
