import Router from './routes/Router';
import MenuBar from '/@/components/MenuBar/MenuBar';

import './App.css';

function App() {
	return (
		<>
			<header>
				<MenuBar />
			</header>
			<main>
				<Router />
			</main>
		</>
	);
}

export default App;
