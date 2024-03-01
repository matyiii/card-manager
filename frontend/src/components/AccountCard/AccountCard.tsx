import { CardType } from '/@/shared';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

type Props = {
	card: CardType;
};

const AccountCard = ({ card }: Props) => {
	return (
		<Card className='card'>
			<CardHeader title={`Card ID ${card.id}`} />
			<CardContent>
				<Typography>{`Card Number: ${card?.cardNumber}`}</Typography>
				<Typography>{`Valid: ${card?.valid ? 'Yes' : 'No'}`}</Typography>
				<Typography>{`State: ${card?.state}`}</Typography>
				<Typography>{`Type: ${card?.type}`}</Typography>
			</CardContent>
		</Card>
	);
};

export default AccountCard;
