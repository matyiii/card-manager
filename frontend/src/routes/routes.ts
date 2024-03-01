import React from 'react';
import { routeType } from '/@/shared';

const Welcome = React.lazy(() => import('/@/pages/Welcome/Welcome'));
const Login = React.lazy(() => import('/@/pages/Login/Login'));
const Register = React.lazy(() => import('/@/pages/Register/Register'));
const ResetPassword = React.lazy(() => import('/@/pages/ResetPassword/ResetPassword'));
const Profile = React.lazy(() => import('/@/pages/Profile/Profile'));
const Accounts = React.lazy(() => import('/@/pages/Accounts/Accounts'));
const Cards = React.lazy(() => import('/@/pages/Cards/Cards'));
const Transactions = React.lazy(() => import('/@/pages/Transactions/Transactions'));
const Admin = React.lazy(() => import('/@/pages/Admin/Admin'));

export const routes: routeType[] = [
	{
		path: '/',
		exact: true,
		component: Welcome,
		isPrivate: false
	},
	{
		path: '/login',
		exact: true,
		component: Login,
		isPrivate: false
	},
	{
		path: '/register',
		exact: true,
		component: Register,
		isPrivate: false
	},
	{
		path: '/reset-password',
		exact: true,
		component: ResetPassword,
		isPrivate: false
	},
	{
		path: '/profile',
		exact: true,
		component: Profile,
		isPrivate: true
	},
	{
		path: '/accounts',
		exact: true,
		component: Accounts,
		isPrivate: true
	},
	{
		path: '/cards',
		exact: true,
		component: Cards,
		isPrivate: true
	},
	{
		path: '/transactions',
		exact: true,
		component: Transactions,
		isPrivate: true
	},
	{
		path: '/admin',
		exact: true,
		component: Admin,
		isPrivate: true
	},
];
