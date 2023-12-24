import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth';
import Hello from './Components/Hello';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Auth />}></Route>
					<Route path="/inside" element={<Hello />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
