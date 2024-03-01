import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routeType } from '/@/shared';
import { routes } from './routes';

const Router = () => {
	const isAuthenticated = !!localStorage.getItem('token');

	return (
		<Routes>
			{routes.map((route: routeType, index: number) => (
				<Route
					key={index}
					path={route.path}
					element={
						<Suspense fallback={<div>Loading...</div>}>
							{route.isPrivate && !isAuthenticated ? <Navigate to='/login' /> : <route.component />}
						</Suspense>
					}
				/>
			))}
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	);
};

export default Router;
