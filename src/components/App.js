import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/ui/Header';
import theme from './ui/Theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<div style={{ marginTop: '4em' }}>
					<Routes>
						<Route
							path='/'
							element={<div>Home</div>}
						/>
						<Route
							path='/services'
							element={<div>Services</div>}
						/>
						<Route
							path='/customsoftware'
							element={<div>Custom Software</div>}
						/>
						<Route
							path='/mobileapps'
							element={<div>Mobile Apps</div>}
						/>
						<Route
							path='/websites'
							element={<div>Websites</div>}
						/>
						<Route
							path='/revolution'
							element={<div>The Revolution</div>}
						/>
						<Route
							path='/about'
							element={<div>About</div>}
						/>
						<Route
							path='/contact'
							element={<div>Contact</div>}
						/>
						<Route
							path='/estimate'
							element={<div>Estimate</div>}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
