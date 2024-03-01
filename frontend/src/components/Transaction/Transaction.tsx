import { TranscationType } from '/@/shared';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

type Props = {
	transaction: TranscationType;
};

const Transaction = ({ transaction }: Props) => {
	return (
		<Card className='transaction'>
			<CardHeader title={`Transaction ID ${transaction.id}`} />
			<CardContent>
				<Typography>{`Date: ${transaction?.date}`}</Typography>
				<Typography>{`Amount: ${transaction?.amount ? 'Yes' : 'No'}`}</Typography>
				<Typography>{`Type: ${transaction?.type}`}</Typography>
				<Typography>{`Card Number: ${transaction?.cardNumber}`}</Typography>
			</CardContent>
		</Card>
	);
};

export default Transaction;
