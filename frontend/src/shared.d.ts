export interface routeType {
	path: string;
	exact?: boolean;
	component: React.FC | any;
	isPrivate: boolean;
	roles?: string[];
	type?: string;
}

type LoginPayload = {
	email: FormDataEntryValue | any;
	password: FormDataEntryValue | any;
};

type RegisterPayload = {
	firstName: FormDataEntryValue | any;
	lastName: FormDataEntryValue | any;
	email: FormDataEntryValue | any;
	password: FormDataEntryValue | any;
};

type ResetPasswordPaylod = {
	email: FormDataEntryValue | any;
};

type User = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	lastLogin: DateTime;
	createdAt: DateTime;
	passwordLastChanged: DateTime;
};

type UpdateNamePayload = Pick<User, 'firstName' | 'lastName'>;

type ChangePasswordPayload = {
	currentPassword: FormDataEntryValue | any;
	newPassword: FormDataEntryValue | any;
};

type TypeOfAccounts = 'Credit' | 'Deposit' | 'Currency';

type AccountType = {
	id: number;
	balance: number;
	type: TypeOfAccounts;
};

type TypeOfCards = 'Forint' | 'Credit' | 'EUR' | 'USD';

type StateOfCards = 'Active' | 'Inactive' | 'Disabled' | 'Expired';

type CardType = {
	id: number;
	cardNumber: string;
	valid: boolean;
	state: StateOfCards;
	type: TypeOfCards;
	accountId: number;
};

type TypeOfTranscation = 'Normal' | 'Cancelled';

type TranscationType = {
	id: number;
	date: DateTime;
	amount: number;
	type: TypeOfTranscation;
	cardNumber: string;
	vendorId: number;
	cardId: number;
};

type CreateUserWithAccountAndCard = {
	firstName: FormDataEntryValue | any;
	lastName: FormDataEntryValue | any;
	email: FormDataEntryValue | any;
	password: FormDataEntryValue | any;

	// Account properties
	balance: FormDataEntryValue | any;
	accountType: TypeOfAccounts;

	// Card properties
	cardNumber: FormDataEntryValue | any;
	cardValid: FormDataEntryValue | any;
	cardState: StateOfCards;
	cardType: TypeOfCards;
};
