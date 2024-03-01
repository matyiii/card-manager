import { AccountType } from '/@/shared';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

type Props = {
	account: AccountType;
};

const Account = ({ account }: Props) => {
	return (
		<Card className='account'>
			<CardHeader title={`Account ID ${account.id}`} />
			<CardContent>
				<Typography>{`Type: ${account?.type}`}</Typography>
				<Typography>{`Balance: ${account?.balance}`}</Typography>
			</CardContent>
		</Card>
	);
};

export default Account;
