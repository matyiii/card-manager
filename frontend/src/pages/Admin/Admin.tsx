import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DataService from '/@/service/DataService';
import { StateOfCards, TypeOfAccounts, TypeOfCards } from '/@/shared';
import { Alert, MenuItem, Snackbar } from '@mui/material';
import { useState } from 'react';

const Admin = () => {
	/* State */
	const [accountType, setAccountType] = useState<TypeOfAccounts | ''>('');
	const [cardValid, setCardValid] = useState<boolean>(true);
	const [cardState, setCardState] = useState<StateOfCards | ''>('');
	const [cardType, setCardType] = useState<TypeOfCards | ''>('');
	const [isUserCreated, setIsUserCreated] = useState<boolean>(false);

	/* Functions */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const payload = {
			firstName: data.get('firstName'),
			lastName: data.get('lastName'),
			email: data.get('email'),
			password: data.get('password'),

			balance: data.get('balance'),
			accountType: accountType as TypeOfAccounts,

			cardNumber: data.get('cardNumber'),
			cardValid: cardValid,
			cardState: cardState as StateOfCards,
			cardType: cardType as TypeOfCards
		};

		DataService.admin
			.createUserWithAccountAndCard(payload)
			.then((res) => {
				console.log(res);
				setIsUserCreated(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAccountType(event.target.value as TypeOfAccounts);
	};

	const handleCardValidityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCardValid(event.target.value === 'true' ? true : false);
	};

	const handleCardStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCardState(event.target.value as StateOfCards);
	};

	const handleCardTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCardType(event.target.value as TypeOfCards);
	};

	const typeOfAccountsOptions: { value: TypeOfAccounts; label: string }[] = [
		{ value: 'Credit', label: 'Credit' },
		{ value: 'Deposit', label: 'Deposit' },
		{ value: 'Currency', label: 'Currency' }
	];

	const stateOfCardsOptions: { value: StateOfCards; label: string }[] = [
		{ value: 'Active', label: 'Active' },
		{ value: 'Inactive', label: 'Inactive' },
		{ value: 'Disabled', label: 'Disabled' },
		{ value: 'Expired', label: 'Expired' }
	];

	const typeOfCardOptions: { value: TypeOfCards; label: string }[] = [
		{ value: 'Forint', label: 'Forint' },
		{ value: 'Credit', label: 'Credit' },
		{ value: 'EUR', label: 'EUR' },
		{ value: 'USD', label: 'USD' }
	];

	return (
		<Container component='main' maxWidth='xs'>
			<Typography component='h1' variant='h5'>
				Create User With Account And Card
			</Typography>
			<Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12}>
						<TextField required fullWidth id='firstName' label='First Name' name='firstName' />
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextField required fullWidth id='lastName' label='Last Name' name='lastName' />
					</Grid>
					<Grid item xs={12}>
						<TextField required fullWidth id='email' label='Email Address' name='email' />
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='balance'
							label='Balance'
							type='number'
							id='balance'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='accountType'
							label='Select Account Type'
							select
							id='accountType'
							value={accountType}
							onChange={handleAccountTypeChange}
						>
							{typeOfAccountsOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextField required fullWidth id='cardNumber' label='Card Number' name='cardNumber' />
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='cardValid'
							label='Select Card Validity'
							select
							id='cardValid'
							value={cardValid}
							onChange={handleCardValidityChange}
						>
							<MenuItem value={'true'}>Valid</MenuItem>
							<MenuItem value={'false'}>Invalid</MenuItem>
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='cardState'
							label='Select Card State'
							select
							id='cardState'
							value={cardState}
							onChange={handleCardStateChange}
						>
							{stateOfCardsOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='cardType'
							label='Select Card Type'
							select
							id='cardType'
							value={cardType}
							onChange={handleCardTypeChange}
						>
							{typeOfCardOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				</Grid>
				<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
					Create
				</Button>
			</Box>

			<Snackbar
				open={isUserCreated}
				autoHideDuration={5000}
				onClose={() => setIsUserCreated(false)}
			>
				<Alert variant='outlined' severity='success'>
					User, account and card successfully created!
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default Admin;
